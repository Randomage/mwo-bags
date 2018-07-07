import "bulma/css/bulma.css";

import "./bulmaswatch.min.css";
import "./style.css";

import * as React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import { RewardGroupList } from "./containers/reward-group-list";
import { RewardInput } from "./containers/reward-input";
import { rootReducer } from "./root-reducer";

const store = createStore(rootReducer,
    composeWithDevTools(applyMiddleware()));

render(
    <Provider store={store}>
        <>
            <section className="hero">
                <div className="hero-body">
                    <div className="container">
                        <h1 className="title">
                            MWO Bags
                    </h1>
                        <h2 className="subtitle">
                            Paste your bags below
                    </h2>
                    </div>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <div className="columns is-centered">
                        <div className="column reward-input">
                            <RewardInput></RewardInput>
                        </div>
                    </div>
                </div>

                <div className="container">
                    <RewardGroupList></RewardGroupList>
                </div>
            </section>

        </>
    </Provider>,
    document.getElementsByTagName("body")[0]
);
