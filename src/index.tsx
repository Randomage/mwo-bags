import "./style.css";

import * as React from "react";

import { Provider } from "react-redux";
import { RewardGroupList } from "./containers/reward-group-list";
import { RewardInput } from "./containers/reward-input";
import { createStore } from "redux";
import { render } from "react-dom";
import { rootReducer } from "./root-reducer";

const store = createStore(rootReducer);

render(
    <Provider store={store}>
        <div className={"root"}>
            <RewardInput></RewardInput>
            <RewardGroupList></RewardGroupList>
        </div>
    </Provider>,
    document.getElementsByTagName("app-body")[0]
);
