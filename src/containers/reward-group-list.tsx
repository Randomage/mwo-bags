import { hot } from "react-hot-loader";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { RewardItemGroupList, RewardItemGroupListProps } from "../presentation/reward-item-group-list";
import { RootState } from "../root-reducer";

const mapStateToProps: (s: RootState) => RewardItemGroupListProps = (state: RootState) => ({
    rewardGroups: state.rewards.rewardSummaries.sortBy(s => s.name).toArray()
});

const mapDispatchToProps = (dispatch: Dispatch) => ({});

const RewardGroupListComponent = connect(
    mapStateToProps,
    mapDispatchToProps
)(RewardItemGroupList);

export const RewardGroupList = hot(module)(RewardGroupListComponent);
