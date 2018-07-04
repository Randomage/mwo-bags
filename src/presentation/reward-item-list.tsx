import * as React from "react";

import { List } from "immutable";
import { Reward } from "../rewards";
import { RewardItem } from "./reward-item";
import { hot } from "react-hot-loader";

export interface RewardItemListProps {
    rewards: List<Reward>;
}

const RewardItemListComponent: React.SFC<RewardItemListProps> = ({ rewards }) => {

    const rewardListItems = rewards.map((r, index) => r == null ? null : <RewardItem key={index} {...r}></RewardItem>);

    return <div className={"reward-list"}>
        {rewardListItems}
    </div>;
};

export const RewardItemList = hot(module)(RewardItemListComponent);
