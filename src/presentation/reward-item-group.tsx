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

    return <div className="reward">
        <table>
            <thead>
                <tr>
                    <td>{rewardGroup.rewardTypeName}</td>
                    <td>{rewardGroup.rewardCount} bags</td>
                </tr>
            </thead>

            <tbody>
                <tr>
                    {rewardGroup.summaries.map((s) => [<td>{s.name}</td>, <td>{s.value} {s.suffix}</td>])}
                </tr>
            </tbody>
        </table>
    </div>;
};

export const RewardItemGroup = hot(module)(RewardItemGroupComponent);
