import * as React from "react";
import { hot } from "react-hot-loader";

export interface RewardSummary {
    name: string;
    value: number;
    suffix: string;
}

export interface RewardItemGroupProps {
    rewardTypeName: string;
    rewardCount: number;
    summaries: RewardSummary[];
}

const RewardItemGroupComponent: React.SFC<RewardItemGroupProps> = (rewardGroup: RewardItemGroupProps) => {

    return <div className="tile is-parent is-vertical">
        <div className="tile is-child">
            <p className="title is-size-5">{rewardGroup.rewardTypeName}</p>
            <p className="subtitle is-size-6">
                {rewardGroup.rewardCount} bag{rewardGroup.rewardCount === 1 ? "" : "s"}</p>

            {rewardGroup.summaries
                .sort((a, b) => a.name > b.name ? 1 : -1)
                .map((s, i) => <p key={i}>{s.value.toLocaleString()} {s.suffix} {s.name}</p>)}
        </div>
    </div>;
};

export const RewardItemGroup = hot(module)(RewardItemGroupComponent);
