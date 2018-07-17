import { List } from "immutable";
import { ActionType, createStandardAction, getType } from "typesafe-actions";

import { Reward, RewardOfType, RewardType } from "../rewards";

export const parseRewards = createStandardAction("PARSE_REWARDS")<string>();

export type RewardsActions = ActionType<typeof parseRewards>;

interface RewardPattern {
    type: Reward["type"];
    pattern: RegExp;
    createReward: (value: string, match: RegExpMatchArray) => Reward;
}

const initialState = {
    rewards: List<Reward>(),
    rewardSummaries: List<RewardSummary>()
};

const parseInput: (s: string) => List<Reward> = (input: string) => {

    const parseAmount: (match: RegExpMatchArray) => number =
        (m) => parseInt(m[0].replace(",", ""), 10);

    const patterns = List<RewardPattern>([
        {
            type: "Premium Time",
            pattern: /^(1) Day Active Premium Time$/,
            createReward: (v, m) => ({
                type: "Premium Time"
            })
        },
        {
            type: "CBills",
            pattern: /^([0-9,])*? C-Bills$/,
            createReward: (v, m) => ({
                type: "CBills",
                amount: parseAmount(m)
            })
        },
        {
            type: "GXP",
            pattern: /^([0-9,])*? GXP$/,
            createReward: (v, m) => ({
                type: "GXP",
                amount: parseAmount(m)
            })
        },
        {
            type: "MC",
            pattern: /^([0-9,])*? MC$/,
            createReward: (v, m) => ({
                type: "MC",
                amount: parseAmount(m)
            })
        },
        {
            type: "Cockpit Items",
            pattern: /^Cockpit [A-z]*? - (.*?)$/,
            createReward: (v, m) => ({
                type: "Cockpit Items",
                name: m[1]
            })
        },
        {
            type: "Consumables",
            pattern: /((UAV)|(Artillery)|(Cool Shot)|(Air Strike))/,
            createReward: (v, m) => ({
                type: "Consumables",
                name: m[1]
            })
        }
    ]);

    const toReward = (value: string) => {

        const patternMatch =
            patterns
                .map((p) => ({
                    pattern: p,
                    match: value.match(p.pattern) as RegExpMatchArray
                }))
                .filter((r) => r.match != null)
                .first();

        if (patternMatch == null) {

            const noMatch: Reward = {
                rawValue: value,
                type: "Unknown"
            };

            return noMatch;
        }

        return patternMatch.pattern.createReward(value, patternMatch.match);
    };

    const notOnlyNumbers = (s: string) => !/^[0-9]{1,}$/.test(s);

    const rewards = input
        .split(/\n/)
        .map((s) => s.trim())
        .filter(notOnlyNumbers)
        .map(toReward);

    return List<Reward>(rewards);
};

export interface RewardSummaryItem {
    name: string;
    rewardCount: number;
    proportion: number;
}

export interface RewardSummary {
    name: string;
    rewardCount: number;
    summary: string;
    breakdown: RewardSummaryItem[];
}

const groupRewards = (rewards: List<Reward>) => {
    return rewards.groupBy((r) => r.type);
};

const calculateProportion = (count: number, totalCount: number) => {
    return count / totalCount;
};

const summarise: (type: RewardType, rewards: List<Reward>, proportion: (count: number) => number) => RewardSummary =
    (type: RewardType, rewards: List<Reward>, proportion: (count: number) => number) => {

        switch (type) {
            case "CBills":
            case "GXP":
            case "MC":

                const rewardsWithAmount = rewards as List<RewardOfType<typeof type>>;

                return {
                    name: type,
                    rewardCount: rewards.count(),
                    proportion: proportion(rewardsWithAmount.count()),
                    summary: `${rewardsWithAmount.reduce((total, c) => total + c.amount, 0).toLocaleString()} ${type}`,
                    breakdown: rewardsWithAmount
                        .sortBy((r) => r.amount)
                        .groupBy((r) => r.amount)
                        .map((r, amount) => ({
                            name: `${amount.toLocaleString()} ${type}`,
                            rewardCount: r.count(),
                            proportion: proportion(r.count())
                        }))
                        .toList()
                        .toArray()
                };

            case "Cockpit Items":
            case "Consumables":

                const rewardsWithName = rewards as List<RewardOfType<typeof type>>;

                return {
                    name: type as string,
                    rewardCount: rewards.count(),
                    proportion: proportion(rewardsWithName.count()),
                    summary: `${rewardsWithName.count().toLocaleString()} ${type}`,
                    breakdown: rewardsWithName
                        .groupBy((r) => r.name)
                        .map((r, name) => ({
                            name,
                            rewardCount: r.count(),
                            proportion: proportion(r.count())
                        }))
                        .toList()
                        .sortBy((r) => r.name)
                        .toArray()
                };

            case "Premium Time":

                return {
                    name: type as string,
                    rewardCount: rewards.count(),
                    proportion: proportion(rewards.count()),
                    summary: `${rewards.count().toLocaleString()} Days of ${type}`,
                    breakdown: rewards
                        .groupBy((r) => "1 Day of Premium Time")
                        .map((r, name) => ({
                            name,
                            rewardCount: r.count(),
                            proportion: proportion(r.count())
                        }))
                        .toList()
                        .sortBy((r) => r.name)
                        .toArray()
                };

            case "Unknown":

                const unknownRewards = rewards as List<RewardOfType<typeof type>>;

                return {
                    name: type as string,
                    rewardCount: rewards.count(),
                    summary: "",
                    breakdown: unknownRewards
                        .groupBy((r) => r.rawValue)
                        .map((r, rawValue) => ({
                            name: rawValue,
                            rewardCount: r.count(),
                            proportion: proportion(unknownRewards.count())
                        }))
                        .toList()
                        .sortBy((r) => r.name)
                        .toArray()
                };

            default:
                return {
                    name: "",
                    rewardCount: 0,
                    summary: "",
                    breakdown: []
                };
        }

    };

export interface ParsedRewards {
    rewards: List<Reward>;
    rewardSummaries: List<RewardSummary>;
}

export default function reducer(state: ParsedRewards = initialState, action: RewardsActions) {

    switch (action.type) {
        case getType(parseRewards):

            const rewards = parseInput(action.payload);

            return {
                rewards,
                rewardSummaries: groupRewards(rewards)
                    .map((g, k) => summarise(k, g.toList(), (c) => calculateProportion(c, rewards.count())))
                    .toList()
            };

        default:
            return state;
    }
}
