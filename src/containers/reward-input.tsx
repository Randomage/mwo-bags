import { hot } from "react-hot-loader";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { TextArea } from "../presentation/text-area";
import { inputChanged } from "../redux/input";
import { parseRewards } from "../redux/rewards";
import { RootState } from "../root-reducer";

const mapStateToProps = (state: RootState) => ({
    label: "",
    placeholder: `1
62,500 C-Bills
2...`,
    text: state.input
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
