'use client';
import styles from './page.module.scss'
import { InputLogin } from '../components/input'
import { Eye, EyeClosed, Keyhole, UserCircle } from "phosphor-react";
import { FormEvent, useContext, useState } from 'react';
import { ButtonPrimaryLogin } from '@/components/button';
import Image from 'next/image';

import Logo from '../../public/logo-login.svg'
import { Loading } from '@/components/loading';
import { useAuth } from '@/lib/AuthContext';
 

export default function Home() {
  const { signIn } = useAuth();

  const [iconEye, setIconEye] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("");

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

  async function handleLogin(e: FormEvent){
    e.preventDefault();

    setLoading(true);
    await signIn({
      emailReq: email,
      password: password
    })
  }

  return (
    <main className={styles.main}>

      <div className={styles.containerLogo}>
        <Image 
          src={Logo}
          alt={"Imagem para representar o Diário do Programador"}
          width={700}
        />
      </div>

      <form className={styles.containerLogin} onSubmit={handleLogin}>
        <strong className={styles.titleLogin}>Login</strong>
        
        <div className={styles.contentInput}>
          <UserCircle size={32} weight="light" style={{ "marginTop": "1.5rem" }} />
          <InputLogin 
            title={" Usuário"}
            placeholder='Nome de Usuário'
            id='username'
            type={"email"}
            value={email as string}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className={styles.contentInput}>
          <Keyhole size={40} weight="light" style={{ "marginTop": "1.5rem" }} />
          <InputLogin 
            title={"Senha"}
            placeholder='Digite sua senha'
            id='passwordLogin'
            type={"password"}
            value={password as string}
            onChange={(e) => setPassword(e.target.value)}
          />
          {!iconEye ? (
            <Eye size={32} weight="light" onClick={handleVisiblePassword}  style={{ "marginTop": "1.5rem", cursor: "pointer" }} />
          ) : (
            <EyeClosed size={32} weight="light" onClick={handleVisiblePassword}  style={{ "marginTop": "1.5rem", cursor: "pointer" }}  />
          )}
        </div>

        <ButtonPrimaryLogin style={{marginTop: "2.5rem"}} type={"submit"}>
          Entrar
        </ButtonPrimaryLogin>

        <span className={styles.forwardPass}>Esqueceu sua senha? <a href="#" className={styles.forwardPass__a}>Clique aqui!</a></span>
        
      </form>

      {loading ? ( <Loading /> ): ( <></> )}
    </main>

  )
}
