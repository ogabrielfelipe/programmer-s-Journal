"use client";
import { SideBarVertical } from "@/components/sideBar";
import styles from "./styles.module.scss";

import React, { FormEvent, useState } from "react";
import moment from "moment";
import 'moment/locale/pt-br'
import { PlusCircle, X } from "phosphor-react";

import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { InputLogin, TextAreaForm } from "@/components/input";
import { ButtonPrimaryForm, ButtonSecondaryForm } from "@/components/button";

type dateItems = {
  days: string[],
  dateViewInterval: string
}

enum typeModelEnum {
  create,
  update,
  view,
  closeModel,
}


export default function Home() {
  const [dateInterval, setDateInterval] = useState<dateItems>();
  const [dateModelCard, setDateModelCard] = useState<string>("");
  const [titleCard, setTitleCard] = useState<string>("");
  const [descriptionCard, setDescriptionCard] = useState<string>("");
  const [checkboxCard, setCheckboxCard] = useState<boolean>(false);
  const [colorCard, setColorCard] = useState<string>("#6c6cea");


  const parseDates = (inp: string) => {
    let year = parseInt(inp.slice(0, 4), 10);
    let week = parseInt(inp.slice(6), 10);
    let dayWeek = 7;

    let day = (1 + (week - 1) * 7); // 1st of January + 7 days for each week

    let dayOffset = new Date(year, 0, 1).getDay(); // we need to know at what day of the week the year start

    dayOffset--;  // depending on what day you want the week to start increment or decrement this value. This should make the week start on a monday

    let days = [];
    for (let i = 0; i < dayWeek; i++) // do this 7 times, once for every day
      days.push(moment(new Date(year, 0, day - dayOffset + i)).format("YYYY-MM-DD")); // add a new Date object to the array with an offset of i days relative to the first day of the week

    let dateViewInterval = `${moment(days[0]).locale('pt-br').format("DD [de] MMMM")} à ${moment(days[days.length - 1]).locale('pt-br').format("DD [de] MMMM")}`

    return {
      days,
      dateViewInterval
    };
  }

  function showModel(typeModel: typeModelEnum, dateCard: string){
    let model = document.querySelector(`.${styles.containerModel}`)
    model?.classList.add(styles.containerModelShow)
    setDateModelCard(dateCard);
  } 

  function closeModel(typeModel: typeModelEnum){
    let model = document.querySelector(`.${styles.containerModel}`)
    model?.classList.toggle(styles.containerModelShow)

    cleanInputs();
  } 

  function register(e: FormEvent){
    e.preventDefault();

    let data = {
      dateModelCard,
      titleCard,
      descriptionCard,
      checkboxCard,
      colorCard
    }

    console.log(data);
    closeModel(typeModelEnum.closeModel)
  }

  function cleanInputs(){
    setDateModelCard("");
    setTitleCard("");
    setDescriptionCard("");
    setCheckboxCard(false);
    setColorCard("#6c6cea");

  }

  return (
    <>
      <SideBarVertical />
      <main className={styles.main}>
        <div className={styles.containerCalendar}>
          <div className={styles.containerCalendar__containerInput}>
            <input type="week" id="weekInterval" className={styles.containerCalendar__containerInput__input} name="weekInterval" onChange={(e) => {
              setDateInterval(parseDates(e.target.value));
            }} />

            {dateInterval?.dateViewInterval ? (
              <span className={styles.containerCalendar__containerInput__viewInterval}>
                {dateInterval?.dateViewInterval}
              </span>
            ) : (
              <>
              </>
            )}
          </div>

          <div className={styles.containerCalendar__contentDay}>
            {dateInterval?.days.map(date => {
              return (
                <div className={styles.containerCalendar__contentDay__cardDay} key={date}>
                  <div className={styles.containerCalendar__contentDay__cardDay__title}>
                    {moment(date).format("DD/MM/YYYY")}
                    <PlusCircle size={32} style={{ cursor: "pointer" }}  onClick={() => { showModel(typeModelEnum.create, date) }}/>
                  </div>

                  <div className={styles.containerCalendar__contentDay__cardDay__content}>
                    <Popup
                      trigger={
                        <span id="asdkaosdasndaosjdasd" className={styles.containerCalendar__contentDay__cardDay__content__item}>Titulo card</span>
                      }
                      position="right center"
                      contentStyle={{
                        background: "rgba(34,32,37)",
                        color: "#FFFFFF",
                        border: "none",
                        boxShadow: "0 0 10px 0 #000000",
                        zIndex: "801",
                      }}

                    >
                      <div className={styles.containerCalendar__contentDay__cardDay__content__item__popup}>
                        <a className={styles.containerCalendar__contentDay__cardDay__content__item__popup__itemA}>Visualizar</a>
                        <a className={styles.containerCalendar__contentDay__cardDay__content__item__popup__itemA}>Alterar</a>
                        <a className={styles.containerCalendar__contentDay__cardDay__content__item__popup__itemA}>Excluir</a>
                      </div>
                    </Popup>
                  </div>

                </div>
              )
            })}
          </div>
        </div>
      </main>



      <div className={styles.containerModel}>
        <div className={styles.containerModel__model}>
            <div className={styles.containerModel__model__header}>
              <span className={styles.containerModel__model__header__title}>Cadastrar Card</span>
              <X size={32} style={{cursor: "pointer"}} weight={"bold"} onClick={() => closeModel(typeModelEnum.closeModel)}/>
            </div>
            <form className={styles.containerModel__model__section} onSubmit={register}>
              <InputLogin 
                type={"date"}
                title="Data"
                value={dateModelCard}
                onChange={(e) => setDateModelCard(e.target.value)}
              />
              <InputLogin 
                type={"text"}
                title="Título"
                value={titleCard}
                onChange={(e) => setTitleCard(e.target.value)}
              /> 

              <div className={styles.containerModel__model__section__group}>
                <InputLogin 
                  type={"checkbox"}
                  title="Finalizado"
                  style={{maxWidth: "1.5rem", "padding": "0.5rem"}}
                  checked={checkboxCard}
                  onChange={(e) => setCheckboxCard(!checkboxCard)}
                />

                <InputLogin 
                  type={"color"}
                  title="Cor de Fundo"
                  style={{maxWidth: "5rem", "padding": "0.5rem"}}
                  value={colorCard}
                  onChange={(e) => setColorCard(e.target.value)}
                />                
              </div>

              <TextAreaForm
                title="Descrição"
                cols={10}
                rows={16}
                value={descriptionCard}
                onChange={(e) => setDescriptionCard(e.target.value)}
              />

              <div className={styles.containerModel__model__section__groupBtn}>
                <ButtonSecondaryForm onClick={() => closeModel(typeModelEnum.closeModel)} type={"button"}>
                  Cancelar
                </ButtonSecondaryForm>
                <ButtonPrimaryForm type={"submit"}>
                  Confirmar
                </ButtonPrimaryForm>
              </div>

            </form>
        </div>
      </div>


    </>
  );
}
