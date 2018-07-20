import * as React from "react";
import { hot } from "react-hot-loader";

export interface TextAreaProps {
    label: string;
    placeholder: string;
    text: string;
    onTextChange: (value: string) => void;
}

const TextAreaComponent: React.SFC<TextAreaProps> = ({ label, placeholder, text, onTextChange }) => (
    <div className={"text-area"}>
        <label>
            {label}
            <textarea
                className="textarea"
                placeholder={placeholder}
                value={text}
                onChange={e => onTextChange(e.target.value)}
            />
        </label>
    </div>
);

export const TextArea = hot(module)(TextAreaComponent);
