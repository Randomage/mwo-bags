import * as React from "react";
import { hot } from "react-hot-loader";

import { RewardItemGroup, RewardItemGroupProps } from "./reward-item-group";

export interface RewardItemGroupListProps {
    rewardGroups: RewardItemGroupProps[];
}

const RewardItemGroupListComponent: React.SFC<RewardItemGroupListProps> = ({ rewardGroups }) => {

    const groupsHtml = rewardGroups
        .sort((a, b) => a.rewardTypeName > b.rewardTypeName ? 1 : -1)
        .map((g, i) => g == null ? null :
            <div key={i} className="tile is-child box">
                <RewardItemGroup {...g}></RewardItemGroup>
            </div>
        );

    return <div className="tile is-ancestor">
        <div className="tile is-parent is-vertical is-6">
            {groupsHtml.slice(0, 3)}
        </div>
        <div className="tile is-parent is-vertical is-6">
            {groupsHtml.slice(3, 6)}
        </div>
    </div>;
};

export const RewardItemGroupList = hot(module)(RewardItemGroupListComponent);
