import { List } from "immutable";

import { parseRewardString } from "./parse-reward-string";
import { Reward } from "./rewards";

describe("parseRewardsString", () => {

    it("returns empty for an empty string", () => {

        expect(parseRewardString("")).toBe(List<Reward>());

    });

    it("returns empty for a whitespace string", () => {

        expect(parseRewardString("         ")).toBe(List<Reward>());

    });

    it("returns empty for lines containing only numbers", () => {

        expect(parseRewardString(`0
2523
5543
   23432  `)).toBe(List<Reward>());

    });

    it("returns unknown rewards for lines containing non-reward strings", () => {

        expect(parseRewardString("notAReward")).toEqual(List<Reward>([{
            rawValue: "notAReward",
            type: "Unknown",
        }]));

    });

    it("parses CBill rewards", () => {

        expect(parseRewardString("62,500 C-Bills")).toEqual(List<Reward>([{
            type: "CBills",
            amount: 62500
        }]));

    });

    it("parses MC rewards", () => {

        expect(parseRewardString("30 MC")).toEqual(List<Reward>([{
            type: "MC",
            amount: 30
        }]));

    });

    it("parses GXP rewards", () => {

        expect(parseRewardString("300 GXP")).toEqual(List<Reward>([{
            type: "GXP",
            amount: 300
        }]));

    });

    it("parses consumable rewards", () => {

        expect(parseRewardString("CBill Cool Shot")).toEqual(List<Reward>([{
            type: "Consumables",
            name: "Cool Shot"
        }]));

    });

    it("parses cockpit item rewards", () => {

        expect(parseRewardString("Cockpit Mounted - UrbanMech Warhorn")).toEqual(List<Reward>([{
            type: "Cockpit Items",
            name: "UrbanMech Warhorn"
        }]));

    });

    it("parses premium time rewards", () => {

        expect(parseRewardString("1 Day Active Premium Time")).toEqual(List<Reward>([{
            type: "Premium Time"
        }]));

    });

    it("parses multiple reward types", () => {

        expect(parseRewardString(`1
        62,500 C-Bills
        2
        500,000 C-Bills
        3
        30 MC
        4
        CBill Artillery
        5
        200 GXP
        6
        200 GXP
        7
        Cockpit Mounted - UrbanMech Warhorn
        8
        112,500 C-Bills
        9
        200 GXP
        10
        1 Day Active Premium Time
        11
        75,000 C-Bills
        12
        100,000 C-Bills`)).toEqual(List<Reward>([{
                amount: 62500,
                type: "CBills",
            },
            {
                amount: 500000,
                type: "CBills",
            },
            {
                amount: 30,
                type: "MC",
            },
            {
                name: "Artillery",
                type: "Consumables",
            },
            {
                amount: 200,
                type: "GXP",
            },
            {
                amount: 200,
                type: "GXP",
            },
            {
                name: "UrbanMech Warhorn",
                type: "Cockpit Items",
            },
            {
                amount: 112500,
                type: "CBills",
            },
            {
                amount: 200,
                type: "GXP",
            },
            {
                type: "Premium Time",
            },
            {
                amount: 75000,
                type: "CBills",
            },
            {
                amount: 100000,
                type: "CBills",
            }]));

    });
});
