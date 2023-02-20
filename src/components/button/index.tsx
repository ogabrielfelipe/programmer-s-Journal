import { ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './styles.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    children: ReactNode,
}

function ButtonPrimaryLogin( { children, ...rest }:ButtonProps ){
    return (
        <button className={styles.button} {...rest}>
            {children}
        </button>
    )
}

export { ButtonPrimaryLogin }