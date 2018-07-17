import { hot } from "react-hot-loader";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { Summary } from "../presentation/summary";
import { RootState } from "../root-reducer";

const mapStateToProps = (state: RootState) => ({
    items: state.rewards.rewardSummaries.map((s) => ({ name: s.name, value: s.summary })).toArray()
});

const mapDispatchToProps = (dispatch: Dispatch) => (
    {}
);

const RewardSummaryComponent = connect(
    mapStateToProps,
    mapDispatchToProps
)(Summary);

export const RewardSummary = hot(module)(RewardSummaryComponent);
