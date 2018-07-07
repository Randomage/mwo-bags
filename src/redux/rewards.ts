import { List, Map } from "immutable";
import { ActionType, createStandardAction, getType } from "typesafe-actions";

import { CBills, CockpitItem, Consumable, GXP, MC, PremiumTime, Reward } from "../rewards";

export const parseRewards = createStandardAction("PARSE_REWARDS")<string>();

export type RewardsActions = ActionType<typeof parseRewards>;

const initialState = List<Reward>();

const parseInput: (s: string) => List<Reward> = (input: string) => {

    const patterns = Map({
        PremiumTime: /^(1) Day Active Premium Time$/,
        CBills: /^([0-9,])*? C-Bills$/,
        GXP: /^([0-9,])*? GXP$/,
        MC: /^([0-9,])*? MC$/,
        CockpitItem: /^Cockpit [A-z]*? - (.*?)$/,
        Consumable: /((UAV)|(Artillery)|(Cool Shot)|(Air Strike))/
    });

    const parseAmount: (match: RegExpMatchArray | null) => number =
        (m) => m == null ? 0 : parseInt(m[0].replace(",", ""), 10);

    const parts = input
        .split(/\n/)
        .map((s) => s.trim())
        .filter((s) => !/^[0-9]{1,}$/.test(s))
        .map((s) => patterns.map((p, k) => ({ value: s, type: k as string, match: s.match(p as RegExp) }))
            .filter((r) => r == null ? false : r.match != null)
            .first())
        .map((r) => {
            if (r == null) {
                return null;
            }

            switch (r.type) {
                case "PremiumTime":
                    return {
                        type: "Premium Time"
                    } as PremiumTime;
                case "CBills":
                    return {
                        type: "CBills",
                        amount: parseAmount(r.match)
                    } as CBills;
                case "MC":
                    return {
                        type: "MC",
                        amount: parseAmount(r.match)
                    } as MC;
                case "GXP":
                    return {
                        type: "GXP",
                        amount: parseAmount(r.match)
                    } as GXP;
                case "Consumable":
                    return {
                        type: "Consumables",
                        name: r.match == null ? "Unknown" : r.match[1]
                    } as Consumable;
                case "CockpitItem":
                    return {
                        type: "Cockpit Items",
                        name: r.match == null ? "Unknown" : r.match[1]
                    } as CockpitItem;
                default:
                    console.log(`Failed to parse: '${r.value}'`);
                    return null;
            }
        })
        .filter((r) => r != null);

    return List<Reward>(parts);
};

export default function reducer(state: List<Reward> = initialState, action: RewardsActions) {

    switch (action.type) {
        case getType(parseRewards):
            return parseInput(action.payload);
    }

    return state;
}
