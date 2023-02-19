import { ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './styles.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    children: ReactNode,
}

function ButtonPrimary( { children, ...rest }:ButtonProps ){
    return (
        <button className={styles.button} {...rest}>
            {children}
        </button>
    )
}

export { ButtonPrimary }