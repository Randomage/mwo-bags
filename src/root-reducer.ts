import { combineReducers } from "redux";
import { StateType } from "typesafe-actions";

import { default as input } from "./redux/input";
import { default as rewards } from "./redux/rewards";

export const rootReducer = combineReducers({ input, rewards });

export type RootAction = typeof rewards;
export type RootState = StateType<typeof rootReducer>;
