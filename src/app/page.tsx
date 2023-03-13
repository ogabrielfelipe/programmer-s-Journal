"use client";
import { SideBarVertical } from "@/components/sideBar";
import styles from "./styles.module.scss";

import React, { FormEvent, useState } from "react";
import moment from "moment";
import 'moment/locale/pt-br'
import { Check, CheckCircle, PlusCircle, X} from "phosphor-react";

import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { InputLogin, TextAreaForm } from "@/components/input";
import { ButtonPrimaryForm, ButtonSecondaryForm } from "@/components/button";
import { api } from "@/lib/services/apiClient";
import { Loading } from "@/components/loading";
import { toast } from "react-toastify";



enum typeModelEnum {
  create,
  update,
  view,
  closeModel,
}

type cards = {
  id: string,
  date: Date,
  title: string,
  finished: boolean,
  color: string,
  description: string
}

type fieldCards = {
  day: string,
  cards: cards[] | []

}
type dateItems = {
  fieldCards: fieldCards[],
  dateViewInterval?: string,
}

type datesSelectionsType = {
  days: string[],
  dateViewInterval: string
}

export default function Home() {
  const [loading, setLoading] = useState<boolean>(false)
  const [dateInterval, setDateInterval] = useState<dateItems>();

  const [idCard, setIdCard] = useState<string>("");
  const [dateModelCard, setDateModelCard] = useState<string>("");
  const [titleCard, setTitleCard] = useState<string>("");
  const [descriptionCard, setDescriptionCard] = useState<string>("");
  const [checkboxCard, setCheckboxCard] = useState<boolean>(false);
  const [colorCard, setColorCard] = useState<string>("#6c6cea");

  const [datesSelections, setDatesSelections] = useState<datesSelectionsType>({days: Array<string>(), dateViewInterval: ""});
  const [statusModel, setStatusModel] = useState<typeModelEnum>();
  

  const parseDates = (inp: string) => {
    let year = parseInt(inp.slice(0, 4), 10);
    let week = parseInt(inp.slice(6), 10);
    let dayWeek = 7;
    let day = (1 + (week - 1) * 7);
    let dayOffset = new Date(year, 0, 1).getDay();
    dayOffset--;
    let days = [];
    for (let i = 0; i < dayWeek; i++)
      days.push(moment(new Date(year, 0, day - dayOffset + i)).format("YYYY-MM-DD"));
    let dateViewInterval = `${moment(days[0]).locale('pt-br').format("DD [de] MMMM")} à ${moment(days[days.length - 1]).locale('pt-br').format("DD [de] MMMM")}`
    return {
      days,
      dateViewInterval
    };
  }

  function showModel(typeModel: typeModelEnum, dateCard: string) {
    let model = document.querySelector(`.${styles.containerModel}`)
    model?.classList.add(styles.containerModelShow)
    setDateModelCard(dateCard);
    setStatusModel(typeModel);
  }

  function closeModel(typeModel: typeModelEnum) {
    let model = document.querySelector(`.${styles.containerModel}`)
    model?.classList.toggle(styles.containerModelShow)

    cleanInputs();
  }

  async function register(e: FormEvent) {
    e.preventDefault();

    let data = {
      date: new Date(dateModelCard),
	    title: titleCard,
	    finished: checkboxCard,
	    color: colorCard,
	    description: descriptionCard
    }

    setLoading(true);
    await api.post("/api/card/create", data)
    .then(resp => {
      setLoading(false);
      toast.success("Registro salvo com sucesso!");
      populateWithCards(datesSelections!.days, datesSelections!.dateViewInterval);
    })
    .catch(err => {
      console.log(err);
      setLoading(false);
      toast.error("Não foi possível salvar o registro!");
    })
    console.log(data);
    closeModel(typeModelEnum.closeModel)
  }

  async function populateWithCards(days: string[], intervalViewDate: string) {
    let dateInitial = days[0];
    let dateFinal = days[days.length - 1];

    setLoading(true)

    api.post("/api/card/findByDates", {
      dateInitial,
      dateFinal
    }).then(resp => {
      let cardsForDay: cards[] = resp.data;
      console.log(cardsForDay);


      let listDaysWithCards: fieldCards[] = Array<fieldCards>();
      days.forEach(day => {
        let cardsFil = cardsForDay.filter(card => { if(Number(new Date(card.date)) === Number(new Date(day))) return card; })
        listDaysWithCards.push({day: day, cards: cardsFil})
      })

      let daysWithCards = {
        fieldCards: listDaysWithCards,
        dateViewInterval: intervalViewDate
      }
      setDateInterval(daysWithCards)
      setLoading(false);
    }).catch(err => {
      console.log(err);
      setLoading(false);
    });
  }

  function cleanInputs() {
    setDateModelCard("");
    setTitleCard("");
    setDescriptionCard("");
    setCheckboxCard(false);
    setColorCard("#6c6cea");

  }

  function viewCard(cardID: string) {
    console.log(cardID);
    let cardFil: cards = {
      id: "",
      date: new Date(),
      title: "",
      finished: false,
      color: "",
      description: ""
    };
    dateInterval?.fieldCards.forEach(field => {
      field.cards.filter(card => {
        if (card.id === cardID) cardFil = card;
      })
    })
    console.log(cardFil);
    setIdCard(cardFil.id);
    setTitleCard(cardFil.title)
    setCheckboxCard(cardFil.finished)
    setColorCard(cardFil.color)
    setDescriptionCard(cardFil.description)
    showModel(typeModelEnum.view, moment.utc(cardFil.date).format("YYYY-MM-DD"))
  }

  return (
    <>
      <SideBarVertical />
      <main className={styles.main}>
        <div className={styles.containerCalendar}>
          <div className={styles.containerCalendar__containerInput}>
            <input type="week" id="weekInterval" className={styles.containerCalendar__containerInput__input} name="weekInterval" onChange={(e) => {
              let dates = parseDates(e.target.value)
              setDatesSelections(dates)
              populateWithCards(dates.days, dates.dateViewInterval);
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
            {dateInterval?.fieldCards.map(fieldCard => {
              return (
                <div className={styles.containerCalendar__contentDay__cardDay} key={fieldCard.day}>
                  <div className={styles.containerCalendar__contentDay__cardDay__title}>
                    {moment(fieldCard.day).format("L")}
                    <PlusCircle size={32} style={{ cursor: "pointer" }} onClick={() => { showModel(typeModelEnum.create, fieldCard.day) }} />
                  </div>

                  <div className={styles.containerCalendar__contentDay__cardDay__content}>

                    {fieldCard.cards?.map(card => {
                      return (
                        <>
                          <Popup
                            trigger={
                              <span id={card.id} className={styles.containerCalendar__contentDay__cardDay__content__item} style={{backgroundColor: card.finished ? "#00A300" : card.color }}>
                                {card.title.length > 20 ? card.title.slice(0, 13)+"..." : card.title} {card.finished ? (<Check size={25} />) : (<> </>)}
                                </span>
                            }
                            position="right center"
                            contentStyle={{
                              background: "rgba(34,32,37)",
                              color: "#FFFFFF",
                              border: "none",
                              boxShadow: "0 0 10px 0 #000000",
                              zIndex: "801",
                            }}
                            key={card.id}
                          >
                            <div className={styles.containerCalendar__contentDay__cardDay__content__item__popup}>
                              <a className={styles.containerCalendar__contentDay__cardDay__content__item__popup__itemA} onClick={() => viewCard(card.id)}>Visualizar</a>
                              <a className={styles.containerCalendar__contentDay__cardDay__content__item__popup__itemA}>Alterar</a>
                              <a className={styles.containerCalendar__contentDay__cardDay__content__item__popup__itemA}>Excluir</a>
                            </div>
                          </Popup>
                        </>
                      )
                    })}
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
            <X size={32} style={{ cursor: "pointer" }} weight={"bold"} onClick={() => closeModel(typeModelEnum.closeModel)} />
          </div>
          <form className={styles.containerModel__model__section} onSubmit={register}>
            <InputLogin
              type={"date"}
              title="Data"
              value={String(dateModelCard)}
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
                style={{ maxWidth: "1.5rem", "padding": "0.5rem" }}
                checked={checkboxCard}
                onChange={(e) => setCheckboxCard(!checkboxCard)}
              />

              <InputLogin
                type={"color"}
                title="Cor de Fundo"
                style={{ maxWidth: "5rem", "padding": "0.5rem" }}
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
              {statusModel !== typeModelEnum.view ? (
                <ButtonPrimaryForm type={"submit"}>
                  Confirmar
                </ButtonPrimaryForm>
              ): (
                <>
                </>
              )}
              
            </div>

          </form>
        </div>
      </div>

      {loading ? (<Loading />) : (<></>)}
    </>
  );
}
