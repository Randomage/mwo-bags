import { TextArea, TextAreaProps } from "../presentation/text-area";

import { Dispatch } from "redux";
import { RootState } from "../root-reducer";
import { connect } from "react-redux";
import { hot } from "react-hot-loader";
import { inputChanged } from "../redux/input";
import { parseRewards } from "../redux/rewards";

const mapStateToProps = (state: RootState) => ({
    label: "",
    text: state.input,
    className: "reward-input"
});

const mapDispatchToProps = (dispatch: Dispatch) => (
    {
        onTextChange: (value: string) => {
            dispatch(inputChanged(value));
            dispatch(parseRewards(value));
        }
    }
);

const RewardInputComponent = connect(
    mapStateToProps,
    mapDispatchToProps
)(TextArea);

export const RewardInput = hot(module)(RewardInputComponent);
