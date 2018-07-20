import "bulma/bulma.sass";

import "./bulmaswatch.min.css";
import "./style.scss";

import * as React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import { RewardGroupList } from "./containers/reward-group-list";
import { RewardInput } from "./containers/reward-input";
import { RewardSummary } from "./containers/reward-summary";
import { rootReducer } from "./root-reducer";

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware()));

render(
    <Provider store={store}>
        <>
            <section className="hero">
                <div className="hero-body">
                    <div className="container">
                        <h1 className="title">MWO Bags</h1>
                        <h2 className="subtitle">Paste your bags below</h2>
                    </div>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <div className="columns is-centered">
                        <div className="column reward-input">
                            <RewardInput />
                        </div>
                    </div>
                </div>
            </section>

            <section className="section">
                <RewardSummary />
            </section>

            <section className="section">
                <RewardGroupList />
            </section>
        </>
    </Provider>,
    document.getElementsByTagName("body")[0]
);
