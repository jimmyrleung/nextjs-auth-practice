import { HTMLInputTypeAttribute, InputHTMLAttributes } from "react";
import styles from './Input.module.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> { }

function Input(props: InputProps) {
    const inputProps: InputProps = {
        ...props,
        className: `${styles.input} ${props.className || ''}`
    };
    return (
        <div className={styles.inputWrapper}>
            <input {...inputProps} />
        </div>
    );
}

export { Input }
