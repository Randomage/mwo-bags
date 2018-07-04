import { RewardItemList, RewardItemListProps } from "../presentation/reward-item-list";

import { Dispatch } from "redux";
import { RootState } from "../root-reducer";
import { connect } from "react-redux";
import { hot } from "react-hot-loader";

const mapStateToProps = (state: RootState) => ({
    rewards: state.rewards
});

const mapDispatchToProps = (dispatch: Dispatch) => (
    {}
);

const RewardListComponent = connect(
    mapStateToProps,
    mapDispatchToProps
)(RewardItemList);

export const RewardList = hot(module)(RewardListComponent);
