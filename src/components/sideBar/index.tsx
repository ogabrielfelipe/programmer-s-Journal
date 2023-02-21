"use client";
import styles from "./styles.module.scss";
import React, { useState } from "react";
import { HouseLine, List, Notepad, SignOut, UserCircle, X } from "phosphor-react";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { useAuth } from "@/lib/AuthContext";
import { toast } from "react-toastify";
import Image from "next/image";
import logoDaily from "../../../public/diario-do-programador-login.svg"


function SideBarVertical(){
    const [alterIconMenu, setAlterIconMenu] = useState<boolean>(false);
    const { user, signOut } = useAuth();
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
                        style={{"cursor": "pointer"}}
                        onClick={handleColletMenu}
                    />
                ) : (
                    <X 
                        size={32} 
                        weight="light" 
                        style={{"cursor": "pointer"}}
                        onClick={handleColletMenu}
                    />
                )}
                
                <Image
                    src={logoDaily}
                    alt={"Logo Diário do Programador"}
                />
                
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
                        
                    }}
                    
                >
                    <div>
                        {user ? (
                            <span>{fullName}</span>
                        ) : (
                            <></>
                        )}                        
                        <hr className={styles.separate}/>
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
                            <li className={styles.nav__ul__li}>
                                <HouseLine size={25} weight="light" />
                                <a href="#" className={styles.nav__ul__li__a}> Tela Inicial </a>
                            </li>

                            <li className={styles.nav__ul__li}>
                                <Notepad size={32} weight="light" />
                                <a href="#" className={styles.nav__ul__li__a}> Diário </a>
                            </li>
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