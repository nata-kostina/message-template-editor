import React from "react";
import styles from "./styles.module.css";
import { Button } from "../Button/Button";

interface Props {
    togglePreview: (value: boolean) => void;
    saveTemplate: () => void;
    closeWidget: () => void;
}

export const UserActions = ({ closeWidget, saveTemplate, togglePreview }: Props) => {
    return (
        <div className={styles["user-actions"]}>
            <Button
                text="Preview"
                type="primary"
                onClick={() => togglePreview(true)}
            />
            <Button
                text="Save"
                type="primary"
                onClick={saveTemplate}
            />
            <Button
                text="Close"
                type="secondary"
                onClick={closeWidget}
            />
        </div>
    );
};
