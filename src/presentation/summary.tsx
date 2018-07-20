import * as React from "react";
import { hot } from "react-hot-loader";

export interface SummaryProps {
    items: Array<{ name: string; value: string }>;
}

const SummaryComponent: React.SFC<SummaryProps> = ({ items }) => (
    <div className="level">
        {items.map(s => (
            <div className="level-item has-text-centered">
                <div>
                    <p className="heading">{s.name}</p>
                    <p className="title">{s.value}</p>
                </div>
            </div>
        ))}
    </div>
);

export const Summary = hot(module)(SummaryComponent);
