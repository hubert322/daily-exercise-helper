import { useState } from 'react'
import { Inter } from '@next/font/google'
import Timer from '../Timer/Timer'
import classNames from 'classnames'
import styles from './Exercise.module.css'
import { MdCheckBoxOutlineBlank, MdCheckBox } from 'react-icons/md'
import { IconContext } from 'react-icons'

const inter = Inter({ subsets: ['latin'] })

export interface ExerciseProps {
  name: string
  time?: string
}

export default function Exercise({ name, time }: ExerciseProps) {
  const [isComplete, setIsComplete] = useState(false)

  function notifyOnExpire() {
    const notifTitle = "Time is up!"
    const options = {
      body: `Congrats! You've completed the ${name} exercise!`,
      icon: "/favicon.ico",
      requireInterfaction: true,
      actions: [
        {
          action: "action",
          title: "Confirm",
          type: "button"
        }
      ]
    }
    navigator.serviceWorker.ready.then(registration => {
      registration.showNotification(notifTitle, options)
    })
    setIsComplete(true)
  }

  function onCheckbox() {
    setIsComplete(!isComplete)
  }

  return (
    <div className={styles.card}>
      <div className={styles.cardTitle}>
        <IconContext.Provider value={{ size: "1.5rem" }}>
          <button onClick={onCheckbox}>
            {isComplete ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
          </button>
        </IconContext.Provider>
        <h2 className={classNames(inter.className, isComplete ? styles.crossOut : null)}>{name}</h2>
      </div>
      {time ? (
        <Timer time={time} notifyOnExpire={notifyOnExpire} />
      ) : null}
    </div>
  )
}
