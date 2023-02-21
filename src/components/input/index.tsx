import { InputHTMLAttributes } from 'react';
import styles from './styles.module.scss'

interface InputProps extends InputHTMLAttributes<HTMLInputElement>{
    title: string;
}

function InputLogin( { title, ...rest }:InputProps ){
    return(
        <div className={styles.form__group}>
            <input type="input" className={styles.form__field} {...rest}/>
            <label className={styles.form__label} htmlFor={rest.id}>{title}</label>
        </div>
    )
}

export { InputLogin }