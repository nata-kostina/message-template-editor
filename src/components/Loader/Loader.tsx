import React from "react";
import styles from "./styles.module.css";

export const Loader = () => {
    return (

        <div className={styles["lds-spinner"]} data-testid="loader">
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
        </div>

    );
};
