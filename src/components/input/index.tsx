import { InputHTMLAttributes, TextareaHTMLAttributes } from 'react';
import styles from './styles.module.scss'

interface InputProps extends InputHTMLAttributes<HTMLInputElement>{
    title: string;
}
interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement>{
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

function TextAreaForm({ title, ...rest }:TextAreaProps){
    return(
        <div className={styles.form__group}>
            <textarea className={styles.textarea_form} {...rest}/>
            <label className={styles.form__label} htmlFor={rest.id}>{title}</label>
        </div>
    )
}

export { InputLogin, TextAreaForm }