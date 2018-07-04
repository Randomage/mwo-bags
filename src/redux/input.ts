import { ActionType, createStandardAction, getType } from "typesafe-actions";

export const inputChanged = createStandardAction("INPUT_CHANGED")<string>();

export type InputActions = ActionType<typeof inputChanged>;

const initialState = "";

export default function reducer(state: string = initialState, action: InputActions) {

    switch (action.type) {
        case getType(inputChanged):
            return action.payload;
    }

    return state;
}
