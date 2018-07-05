import { Reward, CBills, RewardGroups, CockpitItem, Consumable, GXP, MC, PremiumTime } from "../rewards";
import { RewardItemGroupList, RewardItemGroupListProps } from "../presentation/reward-item-group-list";
import { RewardItemGroupProps, RewardSummary } from "../presentation/reward-item-group";

import { Dispatch } from "redux";
import { List } from "immutable";
import { RootState } from "../root-reducer";
import { connect } from "react-redux";
import { hot } from "react-hot-loader";

const groupRewards: (r: List<Reward>) => RewardGroups = (rewards) => {

    let groups: RewardGroups = {
        CBills: List<CBills>(),
        CockpitItems: List<CockpitItem>(),
        Consumables: List<Consumable>(),
        GXP: List<GXP>(),
        MC: List<MC>(),
        PremiumTime: List<PremiumTime>()
    };

    groups = rewards.reduce((g, r) => {

        if (groups == null || r == null) {
            return groups;
        }

        switch (r.type) {
            case "CBills":
                groups.CBills = groups.CBills.push(r);
                break;

            case "Cockpit Items":
                groups.CockpitItems = groups.CockpitItems.push(r);
                break;

            case "Consumables":
                groups.Consumables = groups.Consumables.push(r);
                break;

            case "GXP":
                groups.GXP = groups.GXP.push(r);
                break;

            case "MC":
                groups.MC = groups.MC.push(r);
                break;

            case "Premium Time":
                groups.PremiumTime = groups.PremiumTime.push(r);
                break;

            default:
                break;
        }

        return groups;

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
                value: r.CBills.reduce((total, c) => total == null || c == null ? 0 : total + c.amount, 0),
                suffix: "CBills"
            }]
        },
        {
            rewardTypeName: "GXP",
            rewardCount: r.GXP.count(),
            summaries: [{
                name: "Total",
                value: r.GXP.reduce((total, c) => total == null || c == null ? 0 : total + c.amount, 0),
                suffix: "GXP"
            }]
        },
        {
            rewardTypeName: "MC",
            rewardCount: r.MC.count(),
            summaries: [{
                name: "Total",
                value: r.MC.reduce((total, c) => total == null || c == null ? 0 : total + c.amount, 0),
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
                .groupBy((c) => c == null ? null : c.name)
                .map((g, k) => g == null || k == null ? {
                    name: "",
                    value: 0,
                    suffix: ""
                } : {
                        name: k,
                        value: g.count(),
                        suffix: ""
                    }).toArray()
        },
        {
            rewardTypeName: "Cockpit Items",
            rewardCount: r.CockpitItems.count(),
            summaries: r.CockpitItems
                .groupBy((c) => c == null ? null : c.name)
                .map((g, k) => g == null || k == null ? {
                    name: "",
                    value: 0,
                    suffix: ""
                } : {
                        name: k,
                        value: g.count(),
                        suffix: ""
                    }).toArray()
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
