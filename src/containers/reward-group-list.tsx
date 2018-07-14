import { List } from "immutable";
import { hot } from "react-hot-loader";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { RewardItemGroupList, RewardItemGroupListProps } from "../presentation/reward-item-group-list";
import { Reward, RewardOfType, RewardType } from "../rewards";
import { RootState } from "../root-reducer";

export interface RewardSummaryItem {
    name: string;
    rewardCount: number;
}

export interface RewardSummary {
    name: string;
    rewardCount: number;
    summary?: string;
    breakdown: RewardSummaryItem[];
}

const groupRewards = (rewards: List<Reward>) => {

    return rewards.groupBy((r) => r.type);
};

const summarise: (type: RewardType, rewards: List<Reward>) => RewardSummary =
    (type: RewardType, rewards: List<Reward>) => {

        switch (type) {
            case "CBills":
            case "GXP":
            case "MC":

                const rewardsWithAmount = rewards as List<RewardOfType<typeof type>>;

                return {
                    name: type,
                    rewardCount: rewards.count(),
                    summary: `${rewardsWithAmount.reduce((total, c) => total + c.amount, 0).toLocaleString()} ${type}`,
                    breakdown: rewardsWithAmount
                        .sortBy((r) => -r.amount)
                        .groupBy((r) => r.amount)
                        .map((r, amount) => ({
                            name: `${amount.toLocaleString()} ${type}`,
                            rewardCount: r.count()
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
                    summary: `${rewardsWithName.count().toLocaleString()} ${type}`,
                    breakdown: rewardsWithName
                        .groupBy((r) => r.name)
                        .map((r, name) => ({
                            name,
                            rewardCount: r.count()
                        }))
                        .toList()
                        .sortBy((r) => r.name)
                        .toArray()
                };

            case "Premium Time":

                return {
                    name: type as string,
                    rewardCount: rewards.count(),
                    summary: `${rewards.count().toLocaleString()} Days of ${type}`,
                    breakdown: []
                };

            case "Unknown":

                const unknownRewards = rewards as List<RewardOfType<typeof type>>;

                return {
                    name: type as string,
                    rewardCount: rewards.count(),
                    breakdown: unknownRewards
                        .groupBy((r) => r.rawValue)
                        .map((r, rawValue) => ({
                            name: rawValue,
                            rewardCount: r.count()
                        }))
                        .toList()
                        .sortBy((r) => r.name)
                        .toArray()
                };

            default:
                return {
                    name: "",
                    rewardCount: 0,
                    breakdown: []
                };
        }

    };

const mapStateToProps: (s: RootState) => RewardItemGroupListProps = (state: RootState) => ({
    rewardGroups: groupRewards(state.rewards)
        .map((g, k) => summarise(k, g.toList()))
        .toList()
        .toArray()
});

const mapDispatchToProps = (dispatch: Dispatch) => (
    {}
);

const RewardGroupListComponent = connect(
    mapStateToProps,
    mapDispatchToProps
)(RewardItemGroupList);

export const RewardGroupList = hot(module)(RewardGroupListComponent);
