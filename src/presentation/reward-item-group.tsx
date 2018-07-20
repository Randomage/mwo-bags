import * as React from "react";
import { hot } from "react-hot-loader";

import { RewardSummary, RewardSummaryItem } from "../rewards/summarise-rewards";

export type RewardItemGroupProps = RewardSummary;

const RewardItemGroupComponent: React.SFC<RewardItemGroupProps> = (rewardSummary: RewardItemGroupProps) => {
    const renderBreakdown = (breakdown: RewardSummaryItem[]) => {
        return breakdown.map(s => (
            <div className="level breakdown-item">
                <div className="level-left breakdown-name">{s.name}</div>
                <div className="level-right">
                    x{s.rewardCount}&nbsp;
                    <span className="has-text-grey-light">({(s.proportion * 100).toFixed(1)}%)</span>
                </div>
            </div>
        ));
    };

    return (
        <div className="tile is-parent is-vertical">
            <div className="tile is-child box">
                <p className="title is-size-5">{rewardSummary.name}</p>
                <p className="subtitle is-size-6">
                    {rewardSummary.rewardCount} bag{rewardSummary.rewardCount === 1 ? "" : "s"}
                </p>

                <hr />

                <div className="content">{renderBreakdown(rewardSummary.breakdown)}</div>
            </div>
        </div>
    );
};

export const RewardItemGroup = hot(module)(RewardItemGroupComponent);
