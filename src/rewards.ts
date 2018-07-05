import { List } from "immutable";

export interface PremiumTime {
    type: "Premium Time";
}

export interface MC {
    type: "MC";
    amount: number;
}

export interface CBills {
    type: "CBills";
    amount: number;
}

export interface GXP {
    type: "GXP";
    amount: number;
}

export interface Consumable {
    type: "Consumables";
    name: string;
}

export interface CockpitItem {
    type: "Cockpit Items";
    name: string;
}

export type Reward = PremiumTime | MC | CBills | GXP | Consumable | CockpitItem;

export type RewardTypes = Reward["type"];

export interface RewardGroups {
    CBills: List<CBills>;
    PremiumTime: List<PremiumTime>;
    Consumables: List<Consumable>;
    GXP: List<GXP>;
    CockpitItems: List<CockpitItem>;
    MC: List<MC>;
}
