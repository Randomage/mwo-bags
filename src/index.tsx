import "./style.css";
import "bulma/css/bulma.css";

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
        <>
            <section className="hero">
                <div className="hero-body">
                    <div className="container">
                        <h1 className="title">
                            MWO Bags
                    </h1>
                    </div>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <h1 className="title">Summarise Bags</h1>
                    <h2 className="subtitle">
                        Paste your bags below
                    </h2>
                    <div className="columns">
                        <div className="column reward-input">
                            <RewardInput></RewardInput>
                        </div>
                        <div className="column">
                            <RewardGroupList></RewardGroupList>
                        </div>
                    </div>
                </div>
            </section>

        </>
    </Provider>,
    document.getElementsByTagName("body")[0]
);
