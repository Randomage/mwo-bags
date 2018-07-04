import "./style.css";

import * as React from "react";

import { Provider } from "react-redux";
import { RewardInput } from "./containers/reward-input";
import { RewardList } from "./containers/reward-list";
import { createStore } from "redux";
import { render } from "react-dom";
import { rootReducer } from "./root-reducer";

const store = createStore(rootReducer);

render(
    <Provider store={store}>
        <div className={"root"}>
            <RewardInput></RewardInput>
            <RewardList></RewardList>
        </div>
    </Provider>,
    document.getElementsByTagName("app-body")[0]
);
