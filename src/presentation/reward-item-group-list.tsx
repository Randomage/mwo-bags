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
            <div key={i} className="column is-narrow">
                <RewardItemGroup {...g}></RewardItemGroup>
            </div>
        );

    return <div className="columns is-multiline is-centered">
        {groupsHtml}
    </div>;
};

export const RewardItemGroupList = hot(module)(RewardItemGroupListComponent);
