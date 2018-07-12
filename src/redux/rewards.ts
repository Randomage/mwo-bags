import { List, Map } from "immutable";
import { ActionType, createStandardAction, getType } from "typesafe-actions";

import { Reward, RewardTypes } from "../rewards";

export const parseRewards = createStandardAction("PARSE_REWARDS")<string>();

export type RewardsActions = ActionType<typeof parseRewards>;

interface RewardPattern {
    type: Reward["type"];
    pattern: RegExp;
}

const initialState = List<Reward>();

const parseInput: (s: string) => List<Reward> = (input: string) => {

    const patterns = List<RewardPattern>([
        { type: "Premium Time", pattern: /^(1) Day Active Premium Time$/ },
        { type: "CBills", pattern: /^([0-9,])*? C-Bills$/ },
        { type: "GXP", pattern: /^([0-9,])*? GXP$/ },
        { type: "MC", pattern: /^([0-9,])*? MC$/ },
        { type: "Cockpit Items", pattern: /^Cockpit [A-z]*? - (.*?)$/ },
        { type: "Consumables", pattern: /((UAV)|(Artillery)|(Cool Shot)|(Air Strike))/ }
    ]);

    const parseAmount: (match: RegExpMatchArray) => number =
        (m) => parseInt(m[0].replace(",", ""), 10);

    const getMatchingPattern = (value: string) => {

        const matchingPattern =
            patterns
                .map((p) => ({
                    value,
                    type: p.type,
                    match: value.match(p.pattern) as RegExpMatchArray
                }))
                .filter((r) => r.match != null)
                .first();

        if (matchingPattern == null) {
            const unknownValue: {
                value: string,
                type: "Unknown",
                match: RegExpMatchArray
            } = {
                value,
                type: "Unknown",
                match: value.match(/.*/) as RegExpMatchArray
            };

            return unknownValue;
        }

        return matchingPattern;
    };

    const parts = input
        .split(/\n/)
        .map((s) => s.trim())
        .filter((s) => !/^[0-9]{1,}$/.test(s))
        .map((s) => getMatchingPattern(s))
        .map((r) => {

            let result: Reward;

            switch (r.type) {
                case "Premium Time":
                    result = {
                        type: "Premium Time"
                    };
                    break;

                case "CBills":
                    result = {
                        type: "CBills",
                        amount: parseAmount(r.match)
                    };
                    break;

                case "MC":
                    result = {
                        type: "MC",
                        amount: parseAmount(r.match)
                    };
                    break;

                case "GXP":
                    result = {
                        type: "GXP",
                        amount: parseAmount(r.match)
                    };
                    break;

                case "Consumables":
                    result = {
                        type: "Consumables",
                        name: r.match == null ? "Unknown" : r.match[1]
                    };
                    break;

                case "Cockpit Items":
                    result = {
                        type: "Cockpit Items",
                        name: r.match == null ? "Unknown" : r.match[1]
                    };
                    break;

                default:
                    result = {
                        type: "Unknown",
                        rawValue: r.value
                    };
            }

            return result;
        });

    return List<Reward>(parts);
};

export default function reducer(state: List<Reward> = initialState, action: RewardsActions) {

    switch (action.type) {
        case getType(parseRewards):
            return parseInput(action.payload);
    }

    return state;
}
