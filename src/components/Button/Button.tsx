import React from "react";
import cn from "classnames";
import styles from "./styles.module.css";

interface Props {
    text: string;
    onClick: () => void;
    type: "primary" | "secondary";
}

export const Button = ({ text, onClick, type }: Props) => {
    return (
        <button
            className={cn(styles.btn,
                {
                    [styles.btn_primary]: type === "primary",
                    [styles.btn_secondary]: type === "secondary",
                })
        }
            onClick={onClick}
        >{text}
        </button>
    );
};
