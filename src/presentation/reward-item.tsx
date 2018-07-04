import * as React from "react";

import { Reward } from "../rewards";
import { hot } from "react-hot-loader";

export type RewardItemProps = Reward;

const RewardItemComponent: React.SFC<RewardItemProps> = (reward: RewardItemProps) => {

    let propertyTitleHtml: JSX.Element = <div></div>;
    let propertyValueHtml: JSX.Element = <div></div>;

    switch (reward.type) {
        case "CBills":
            propertyTitleHtml = <dt>Amount</dt>;
            propertyValueHtml = <dd>{reward.amount}</dd>;
            break;
        case "Cockpit Items":
            propertyTitleHtml = <dt>Type</dt>;
            propertyValueHtml = <dd>{reward.name}</dd>;
            break;
        case "Consumables":
            propertyTitleHtml = <dt>Type</dt>;
            propertyValueHtml = <dd>{reward.name}</dd>;
            break;
        case "GXP":
            propertyTitleHtml = <dt>Amount</dt>;
            propertyValueHtml = <dd>{reward.amount}</dd>;
            break;
        case "MC":
            propertyTitleHtml = <dt>Amount</dt>;
            propertyValueHtml = <dd>{reward.amount}</dd>;
            break;
    }

    return <div className="reward">
        <dl>
            <dt>Type</dt>
            <dd>{reward.type}</dd>
            {propertyTitleHtml}
            {propertyValueHtml}
        </dl>
    </div>;
};

export const RewardItem = hot(module)(RewardItemComponent);
