import React from "react";
import TextareaAutosize from "react-textarea-autosize";
import styles from "./styles.module.css";
import { Button } from "../Button/Button";
import { VarNamesForm } from "../VarNamesForm/VarNamesForm";

interface Props {
    values: Record<string, string | null>;
    message: string;
    togglePreview: (value: boolean) => void;
    onChange: (payload: { name: string; value: string; }) => void;
}

export const MessagePreview = React.memo(
    ({ togglePreview, values, message, onChange }: Props) => {
        return (
            <div className={styles.preview}>
                <div className={styles.preview__top}>
                    <h4 className={styles.textarea__title}>Message</h4>
                    <TextareaAutosize
                        value={message}
                        autoComplete="false"
                        readOnly={true}
                        className={styles.textarea}
                    />
                    <VarNamesForm values={values} onChange={onChange} />
                </div>

                <div className={styles.preview__bottom}>
                    <Button
                        type="secondary"
                        text="Close"
                        onClick={() => togglePreview(false)}
                    />
                </div>
            </div>
        );
    },
);

MessagePreview.displayName = "MessagePreview";
