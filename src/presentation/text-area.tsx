import * as React from "react";

import { hot } from "react-hot-loader";

export interface TextAreaProps {
    label: string;
    text: string;
    className: string;
    onTextChange: (value: string) => void;
}

const TextAreaComponent: React.SFC<TextAreaProps> = ({ label, text, onTextChange, className }) =>
    <div className={"text-area"}>
        <label>{label}
            <textarea value={text} onChange={(e) => onTextChange(e.target.value)} className={className}></textarea>
        </label>
    </div>;

export const TextArea = hot(module)(TextAreaComponent);
