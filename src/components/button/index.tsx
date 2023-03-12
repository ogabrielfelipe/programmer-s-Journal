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

function ButtonPrimaryForm( { children, ...rest }:ButtonProps ){
    return (
        <button className={styles.buttonForm} {...rest}>
            {children}
        </button>
    )
}

function ButtonSecondaryForm( { children, ...rest }:ButtonProps ){
    return (
        <button className={styles.buttonForm2} {...rest}>
            {children}
        </button>
    )
}


export { ButtonPrimaryLogin, ButtonPrimaryForm, ButtonSecondaryForm }