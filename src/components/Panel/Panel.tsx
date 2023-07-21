import React, { useEffect, useState } from "react";
import cn from "classnames";
import styles from "./styles.module.css";

interface Props {
    header?: string;
    subheader?: string;
    children: React.ReactNode;
    isOpen: boolean;
    customStyles?: React.CSSProperties;
}

export const Panel = ({ header, subheader, children, isOpen, customStyles }: Props) => {
    const [render, setRender] = useState(false);

    useEffect(() => {
        if (isOpen) { setRender(true); }
    }, [isOpen]);

    const onAnimationEnd = () => {
        if (!isOpen) { setRender(false); }
    };
    return (
        <>
            {render && (
                <> <div className={styles.overlay} />
                    <div
                        className={cn(styles.panel, {
                            [styles.panel_slideIn]: isOpen,
                            [styles.panel_slideOut]: !isOpen,
                        })}
                        onAnimationEnd={onAnimationEnd}
                        style={{ ...customStyles }}
                    >
                        <div className={styles.panel__inner}>
                            <div className={styles.panel__top}>
                                {header && <h2 className={styles.panel__header}>{header}</h2>}
                                {subheader && <h3 className={styles.panel__subheader}>{subheader}</h3>}
                            </div>
                            <div className={styles.panel__bottom}>
                                {children}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};
