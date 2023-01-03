import { ButtonHTMLAttributes } from "react";
import styles from './Button.module.css';

function Button(props: ButtonHTMLAttributes<HTMLButtonElement>) {
    const buttonProps: ButtonHTMLAttributes<HTMLButtonElement> = {
        ...props,
        className: `${styles.button} ${props.className || ''}`
    };
    return (
        <button {...buttonProps}>
            {props.children}
        </button>
    );
}

export { Button };
