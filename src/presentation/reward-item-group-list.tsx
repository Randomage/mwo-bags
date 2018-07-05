import * as React from "react";

import { RewardItemGroup, RewardItemGroupProps } from "./reward-item-group";

import { hot } from "react-hot-loader";

export interface RewardItemGroupListProps {
    rewardGroups: RewardItemGroupProps[];
}

const RewardItemGroupListComponent: React.SFC<RewardItemGroupListProps> = ({ rewardGroups }) => {

    return <ul className="reward-group-list">
        {rewardGroups.map((g) => g == null ? null : <li><RewardItemGroup {...g}></RewardItemGroup></li>)}
    </ul>;
};

export const RewardItemGroupList = hot(module)(RewardItemGroupListComponent);
