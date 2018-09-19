import { List } from "immutable";

import { Reward } from "./rewards";

interface RewardPattern {
    type: Reward["type"];
    pattern: RegExp;
    createReward: (value: string, match: RegExpMatchArray) => Reward;
}

const parseAmount: (match: RegExpMatchArray) => number = m => parseInt(m[2].replace(",", ""), 10);

const patterns = List<RewardPattern>([
    {
        type: "Premium Time",
        pattern: /(Premium Time: )?(1) Day Active Premium Time/,
        createReward: (v, m) => ({
            type: "Premium Time"
        })
    },
    {
        type: "CBills",
        pattern: /(C-?Bills: )?([0-9,]{1,}) C-?Bills/,
        createReward: (v, m) => ({
            type: "CBills",
            amount: parseAmount(m)
        })
    },
    {
        type: "GXP",
        pattern: /(GXP: )?([0-9,]{1,}) GXP/,
        createReward: (v, m) => ({
            type: "GXP",
            amount: parseAmount(m)
        })
    },
    {
        type: "MC",
        pattern: /(MC: )?([0-9,]{1,}) MC/,
        createReward: (v, m) => ({
            type: "MC",
            amount: parseAmount(m)
        })
    },
    {
        type: "Cockpit Items",
        pattern: /(Cockpit Items: )?Cockpit [A-z]*? - (.*?)$/,
        createReward: (v, m) => ({
            type: "Cockpit Items",
            name: m[2]
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
    const patternMatch = patterns
        .map(p => ({
            pattern: p,
            match: value.match(p.pattern) as RegExpMatchArray
        }))
        .filter(r => r.match != null)
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
    const notOnlyNumbersOrEmpty = (s: string) => s.length > 0 && !/^[0-9]{1,}$/.test(s);
    const notUnknown = (r: Reward) => r.type !== "Unknown";

    const rewards = input
        .split(/\n/)
        .map(s => s.trim())
        .filter(notOnlyNumbersOrEmpty)
        .map(toReward)
        .filter(notUnknown);

    return List<Reward>(rewards);
};
