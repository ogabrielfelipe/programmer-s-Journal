"use client";


import styles from "./styles.module.scss";
import React, { useState } from "react";
import { At, Gear, HouseLine, List, Notepad, SignOut, User, UserCircle, X } from "phosphor-react";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { useAuth } from "@/lib/AuthContext";
import { toast } from "react-toastify";
import Image from "next/image";
import logoDaily from "../../../public/diario-do-programador-login.svg"
import Link from "next/link";
import { useRouter } from 'next/navigation';


function SideBarVertical(){
    const [alterIconMenu, setAlterIconMenu] = useState<boolean>(false);
    const { user, signOut } = useAuth();
    const router = useRouter();
    const fullName = `${user?.firstName} ${user?.lastName}`

    function handleColletMenu(){
        let menu = document.querySelector(`.${styles.nav}`)
        let header = document.querySelector(`.${styles.header}`)

        let liMenu = document.querySelectorAll(`.${styles.nav__ul__li}`)
        let textMenu = document.querySelectorAll(`.${styles.nav__ul__li__a}`)


        menu?.classList.toggle(`${styles.nav__collect}`)
        header?.classList.toggle(`${styles.header__navCollect}`)

        for (let i = 0; i < liMenu.length; i++){
            liMenu[i]?.classList.toggle(`${styles.nav__ul__li__collect}`)
            textMenu[i]?.classList.toggle(`${styles.nav__ul__li__a__collect}`)
        }

        alterIconMenu ? setAlterIconMenu(false) : setAlterIconMenu(true)
    }


    return (
        <>
            <header className={styles.header}>
                { alterIconMenu ? (
                    <List 
                        size={32} 
                        weight="light" 
                        style={{"cursor": "pointer", marginLeft: "-6.5px"}}
                        onClick={handleColletMenu}
                    />
                ) : (
                    <X 
                        size={32} 
                        weight="light" 
                        style={{"cursor": "pointer", marginLeft: "-6.5px"}}
                        onClick={handleColletMenu}
                    />
                )}

                <Link
                    href={"/"}                
                >
                    <Image
                        src={logoDaily}
                        alt={"Logo Diário do Programador"}
                    />
                </Link>
                
                <Popup 
                    trigger={
                        <UserCircle 
                            size={32} 
                            weight="light" 
                            style={{"cursor": "pointer"}}
                        />
                    } 
                    position="bottom right"
                    contentStyle={{
                        background: "rgba(34,32,37)",
                        color: "#FFFFFF",
                        border: "none",
                        boxShadow: "0 0 10px 0 #000000",
                        zIndex: "801"
                        
                    }}
                    
                >
                    <div>
                        {user ? (
                            <span style={{margin: "1rem"}}>{fullName}</span>
                        ) : (
                            <></>
                        )}                        
                        <hr className={styles.separate} style={{margin: "0.5rem"}}/>
                        <div className={styles.btnExit}  onClick={() => {signOut();}}>
                            <SignOut size={32} weight="light" />
                            <span>Sair</span>
                        </div>
                    </div>
                </Popup>
                
            </header>
            <nav className={styles.nav}>
                <ul className={styles.nav__ul}>
                    { user ? (
                        <>
                            <li className={styles.nav__ul__li} onClick={() => router.push("/")}>
                                <HouseLine size={25} weight="light" />
                                <a href="/" className={styles.nav__ul__li__a} > Tela Inicial </a>
                            </li>
                            <hr className={styles.nav__ul__separate}/>
                            <li className={styles.nav__ul__li}>
                                <At size={25} weight="light" />
                                <a href="#" className={styles.nav__ul__li__a}> Enivar Email </a>
                            </li>
                            <hr className={styles.nav__ul__separate}/>
                            <li className={styles.nav__ul__li}>                                
                                <User size={25} weight="light" />
                                <a href="#" className={styles.nav__ul__li__a}> Usuário </a>
                            </li>
                            <hr className={styles.nav__ul__separate}/>
                            <li className={styles.nav__ul__li}>                                
                                <Gear size={25} weight="light" />
                                <a href="#" className={styles.nav__ul__li__a}> Configurações </a>
                            </li>
                            <hr className={styles.nav__ul__separate}/>  
                        </>
                    ) : (
                        <></>
                    )}                    
                </ul>
            </nav>

        </>
    )
}

export { SideBarVertical }