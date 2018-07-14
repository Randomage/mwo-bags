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

export interface Unknown {
    type: "Unknown";
    rawValue: string;
}

export type Reward = PremiumTime | MC | CBills | GXP | Consumable | CockpitItem | Unknown;

export type RewardType = Reward["type"];

export type RewardOfType<T extends RewardType, U extends Reward = Reward> = U extends { type: T } ? U : never;
