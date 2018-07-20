import { List } from "immutable";

import { Reward, RewardOfType, RewardType } from "./rewards";

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

export const summariseRewards: (
    type: RewardType,
    rewards: List<Reward>,
    calculateProportion: (count: number) => number
) => RewardSummary = (type: RewardType, rewards: List<Reward>, calculateProportion: (count: number) => number) => {
    switch (type) {
        case "CBills":
        case "GXP":
        case "MC":
            const rewardsWithAmount = rewards as List<RewardOfType<typeof type>>;

            return {
                name: type,
                rewardCount: rewards.count(),
                proportion: calculateProportion(rewardsWithAmount.count()),
                summary: `${rewardsWithAmount.reduce((total, c) => total + c.amount, 0).toLocaleString()} ${type}`,
                breakdown: rewardsWithAmount
                    .sortBy(r => r.amount)
                    .groupBy(r => r.amount)
                    .map((r, amount) => ({
                        name: `${amount.toLocaleString()} ${type}`,
                        rewardCount: r.count(),
                        proportion: calculateProportion(r.count())
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
                proportion: calculateProportion(rewardsWithName.count()),
                summary: `${rewardsWithName.count().toLocaleString()} ${type}`,
                breakdown: rewardsWithName
                    .groupBy(r => r.name)
                    .map((r, name) => ({
                        name,
                        rewardCount: r.count(),
                        proportion: calculateProportion(r.count())
                    }))
                    .toList()
                    .sortBy(r => r.name)
                    .toArray()
            };

        case "Premium Time":
            return {
                name: type as string,
                rewardCount: rewards.count(),
                proportion: calculateProportion(rewards.count()),
                summary: `${rewards.count().toLocaleString()} Days of ${type}`,
                breakdown: rewards
                    .groupBy(() => "1 Day of Premium Time")
                    .map((r, name) => ({
                        name,
                        rewardCount: r.count(),
                        proportion: calculateProportion(r.count())
                    }))
                    .toList()
                    .sortBy(r => r.name)
                    .toArray()
            };

        case "Unknown":
            const unknownRewards = rewards as List<RewardOfType<typeof type>>;

            return {
                name: type as string,
                rewardCount: rewards.count(),
                summary: "",
                breakdown: unknownRewards
                    .groupBy(r => r.rawValue)
                    .map((r, rawValue) => ({
                        name: rawValue,
                        rewardCount: r.count(),
                        proportion: calculateProportion(unknownRewards.count())
                    }))
                    .toList()
                    .sortBy(r => r.name)
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
