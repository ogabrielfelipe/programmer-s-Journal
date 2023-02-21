"use client";
import { SideBarVertical } from "@/components/sideBar";
import RootLayout from "./layout";
import styles from "./styles.module.scss"

import React from "react";


export default function Home(){

    const tasks = [
        {
          title: 'Task 1',
          start: '2023-02-22',
          end: '2023-02-22'
        },
        {
          title: 'Task 2',
          start: '2023-02-23',
          end: '2023-02-23'
        }
      ];

    return (
        <>
            <SideBarVertical />
            <main className={styles.main}>
                <div className={styles.containerCalendar}>
                   
                </div>
            </main>
        </>
    )
}

