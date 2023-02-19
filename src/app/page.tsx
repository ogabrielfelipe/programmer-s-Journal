'use client';
import { Inter } from '@next/font/google'
import styles from './page.module.scss'
import { InputLogin } from '../components/input'
import { Eye, EyeClosed, Keyhole, UserCircle } from "phosphor-react";
import { FormEvent, useState } from 'react';
import { ButtonPrimary } from '@/components/button';
 
const inter = Inter({ subsets: ['latin'] })

export default function Home() {


  const [iconEye, setIconEye] = useState<boolean>(false)

  function handleVisiblePassword(){
    let iptPassword = document.getElementById("passwordLogin")

    if(iptPassword?.getAttribute('type') == 'password') {
      iptPassword.setAttribute('type', 'text');
      setIconEye(true)
    } else {
      iptPassword?.setAttribute('type', 'password');
      setIconEye(false)
    }

  }

  function handleLogin(e: FormEvent){
    e.preventDefault();
  }

  return (
    <main className={styles.main}>

      <div className={styles.containerLogo}>
        <h1>logo</h1>
      </div>

      <form className={styles.containerLogin} onSubmit={handleLogin}>
        <strong className={styles.titleLogin}>Login</strong>
        
        <div className={styles.contentInput}>
          <UserCircle size={32} weight="light" style={{ "marginTop": "1.5rem" }} />
          <InputLogin 
            title={" Usuário"}
            placeholder='Nome de Usuário'
            id='username'
            type={"text"}
          />
        </div>

        <div className={styles.contentInput}>
          <Keyhole size={40} weight="light" style={{ "marginTop": "1.5rem" }} />
          <InputLogin 
            title={"Senha"}
            placeholder='Digite sua senha'
            id='passwordLogin'
            type={"password"}
          />
          {!iconEye ? (
            <Eye size={32} weight="light" onClick={handleVisiblePassword}  style={{ "marginTop": "1.5rem", cursor: "pointer" }} />
          ) : (
            <EyeClosed size={32} weight="light" onClick={handleVisiblePassword}  style={{ "marginTop": "1.5rem", cursor: "pointer" }}  />
          )}
        </div>

        <ButtonPrimary style={{marginTop: "2.5rem"}} type={"submit"}>
          Entrar
        </ButtonPrimary>

        <span className={styles.forwardPass}>Esqueceu sua senha? <a href="#" className={styles.forwardPass__a}>Clique aqui!</a></span>
        
      </form>
    </main>
  )
}
