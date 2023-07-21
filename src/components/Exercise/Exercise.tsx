import { useState } from 'react'
import { Inter } from '@next/font/google'
import Timer from '../Timer/Timer'
import classNames from 'classnames'
import styles from './Exercise.module.css'
import { MdCheckBoxOutlineBlank, MdCheckBox, MdEdit, MdClose } from 'react-icons/md'
import { IconContext } from 'react-icons'

const inter = Inter({ subsets: ['latin'] })

export interface ExerciseObj {
  id?: string
  name: string
  category: string
  frequency: string
  time?: string
}

interface ExerciseProps {
  exercise: ExerciseObj
  onEdit: (exercise: ExerciseObj) => void
  onDelete: (exercise: ExerciseObj) => void
}

export default function Exercise({ exercise, onEdit, onDelete }: ExerciseProps) {
  const [isComplete, setIsComplete] = useState(false)

  function notifyOnExpire() {
    const notifTitle = "Time is up!"
    const options = {
      body: `Congrats! You've completed ${exercise.name}!`,
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
        <h2 className={classNames(inter.className, isComplete ? styles.crossOut : null)}>{exercise.name}</h2>
        <IconContext.Provider value={{ size: "1.5rem" }}>
          <button onClick={() => onEdit(exercise)}>
            <MdEdit />
          </button>
        </IconContext.Provider>
        <IconContext.Provider value={{ size: "1.5rem" }}>
          <button onClick={() => onDelete(exercise)}>
            <MdClose />
          </button>
        </IconContext.Provider>
      </div>
      {exercise.time ? (
        <Timer time={exercise.time} notifyOnExpire={notifyOnExpire} />
      ) : null}
    </div>
  )
}
