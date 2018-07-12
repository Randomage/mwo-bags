import { List } from "immutable";
import { hot } from "react-hot-loader";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { RewardItemGroupProps } from "../presentation/reward-item-group";
import { RewardItemGroupList, RewardItemGroupListProps } from "../presentation/reward-item-group-list";
import { CBills, CockpitItem, Consumable, GXP, MC, PremiumTime, Reward, RewardGroups, Unknown } from "../rewards";
import { RootState } from "../root-reducer";

const groupRewards: (r: List<Reward>) => RewardGroups = (rewards) => {

    let groups: RewardGroups = {
        CBills: List<CBills>(),
        CockpitItems: List<CockpitItem>(),
        Consumables: List<Consumable>(),
        GXP: List<GXP>(),
        MC: List<MC>(),
        PremiumTime: List<PremiumTime>(),
        Unknown: List<Unknown>()
    };

    groups = rewards.reduce((g, r) => {

        switch (r.type) {
            case "CBills":
                g.CBills = groups.CBills.push(r);
                break;

            case "Cockpit Items":
                g.CockpitItems = groups.CockpitItems.push(r);
                break;

            case "Consumables":
                g.Consumables = groups.Consumables.push(r);
                break;

            case "GXP":
                g.GXP = groups.GXP.push(r);
                break;

            case "MC":
                g.MC = groups.MC.push(r);
                break;

            case "Premium Time":
                g.PremiumTime = groups.PremiumTime.push(r);
                break;

            case "Unknown":
                g.Unknown = groups.Unknown.push(r);
                break;
        }

        return g;

    }, groups);

    return groups;
};

const summariseRewards: (r: RewardGroups) => RewardItemGroupProps[] = (r) => {

    return [
        {
            rewardTypeName: "CBills",
            rewardCount: r.CBills.count(),
            summaries: [{
                name: "Total",
                value: r.CBills.reduce((total, c) => total + c.amount, 0),
                suffix: "CBills"
            }]
        },
        {
            rewardTypeName: "GXP",
            rewardCount: r.GXP.count(),
            summaries: [{
                name: "Total",
                value: r.GXP.reduce((total, c) => total + c.amount, 0),
                suffix: "GXP"
            }]
        },
        {
            rewardTypeName: "MC",
            rewardCount: r.MC.count(),
            summaries: [{
                name: "Total",
                value: r.MC.reduce((total, c) => total + c.amount, 0),
                suffix: "MC"
            }]
        },
        {
            rewardTypeName: "Premium Time",
            rewardCount: r.PremiumTime.count(),
            summaries: [{
                name: "Total",
                value: r.PremiumTime.count(),
                suffix: "Days"
            }]
        },
        {
            rewardTypeName: "Consumables",
            rewardCount: r.Consumables.count(),
            summaries: r.Consumables
                .groupBy((c) => c.name)
                .map((g, k) => ({
                    name: k,
                    value: g.count(),
                    suffix: ""
                })).toList().toArray()
        },
        {
            rewardTypeName: "Cockpit Items",
            rewardCount: r.CockpitItems.count(),
            summaries: r.CockpitItems
                .groupBy((c) => c.name)
                .map((g, k) => ({
                    name: k,
                    value: g.count(),
                    suffix: ""
                })).toList().toArray()
        },
        {
            rewardTypeName: "Unknown?",
            rewardCount: r.Unknown.count(),
            summaries: r.Unknown
                .groupBy((c) => c.rawValue)
                .map((g, k) => ({
                    name: k,
                    value: g.count(),
                    suffix: ""
                })).toList().toArray()
        }
    ];
};

const mapStateToProps: (s: RootState) => RewardItemGroupListProps = (state: RootState) => ({
    rewardGroups: summariseRewards(groupRewards(state.rewards))
});

const mapDispatchToProps = (dispatch: Dispatch) => (
    {}
);

const RewardGroupListComponent = connect(
    mapStateToProps,
    mapDispatchToProps
)(RewardItemGroupList);

export const RewardGroupList = hot(module)(RewardGroupListComponent);
