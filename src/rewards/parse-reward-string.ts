import { List } from "immutable";

import { Reward } from "./rewards";

interface RewardPattern {
    type: Reward["type"];
    pattern: RegExp;
    createReward: (value: string, match: RegExpMatchArray) => Reward;
}

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

export const parseRewardString: (s: string) => List<Reward> = (input: string) => {

    const notOnlyNumbers = (s: string) => !/^[0-9]{1,}$/.test(s);

    const rewards = input
        .split(/\n/)
        .map((s) => s.trim())
        .filter(notOnlyNumbers)
        .map(toReward);

    return List<Reward>(rewards);
};
