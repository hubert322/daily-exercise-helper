import { Dispatch, SetStateAction, useState } from 'react'
import Head from 'next/head'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import { useTimer } from 'react-timer-hook'

const inter = Inter({ subsets: ['latin'] })

interface ExerciseInterface {
  name: string
  time?: string
}

export default function Home() {

  const exercises = [
    {
      name: "Drunk Spiderwalk",
      time: "5:00",
    },
    {
      name: "Vocal Warmups",
      time: "00:05"
    },
  ]

  return (
    <>
      <Head>
        <title>Daily Exercise Helper</title>
        <meta name="description" content="A personalized daily exercise helper that would keep you ontop of your daily game." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.description}>
          <p>Your New Year&apos;s Resolution</p>
          <div>By Hubert Hung</div>
        </div>
        <div className={styles.center}>
          <h1 className={inter.className}>Daily Exercise Helper</h1>
        </div>
        <div className={styles.grid}>
          {exercises.map((exercise, i) => (
            <Exercise {...exercise} key={`exercise-${i}`} />
          ))}
        </div>
      </main>
    </>
  )
}

function Exercise({ name, time }: ExerciseInterface) {
  return (
    <div className={styles.card}>
      <h2 className={inter.className}>{name}</h2>
      {time ? (
        <Timer time={time} />
      ) : (
        <input type="checkbox" />
      )}
    </div>
  )
}

interface TimerProps {
  time: string
}

function Timer({ time }: TimerProps) {
  const [hasStarted, setHasStarted] = useState(false)

  const {
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({
    autoStart: false, expiryTimestamp: getExpiryTimestamp(time), onExpire: onExpire
  })

  function onExpire() {
    alert("Time is up!")
    onRestart()
  }

  function getExpiryTimestamp(time: string) {
    const expiryTimestamp = new Date()
    const [minutes, seconds] = time.split(":")
    expiryTimestamp.setMinutes(expiryTimestamp.getMinutes() + Number(minutes))
    expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + Number(seconds))
    return expiryTimestamp
  }

  function onRestart() {
    setHasStarted(false)
    restart(getExpiryTimestamp(time), false)
  }

  function getTimeLeft(minutes: number, seconds: number) {
    const minutesStr = minutes.toLocaleString("en-US", { minimumIntegerDigits: 2, useGrouping: false })
    const secondsStr = seconds.toLocaleString("en-US", { minimumIntegerDigits: 2, useGrouping: false })
    return minutesStr + ":" + secondsStr
  }

  return (
    <p className={inter.className}>
      <TimerButton hasStarted={hasStarted} setHasStarted={setHasStarted} isRunning={isRunning} start={start} pause={pause} resume={resume} onRestart={onRestart} /> {getTimeLeft(minutes, seconds)}
    </p>
  )
}

interface TimerButtonProps {
  hasStarted: boolean
  setHasStarted: Dispatch<SetStateAction<boolean>>
  isRunning: boolean
  start: () => void
  pause: () => void
  resume: () => void
  onRestart: () => void
}

function TimerButton({ hasStarted, setHasStarted, isRunning, start, pause, resume, onRestart }: TimerButtonProps) {

  function onStart() {
    setHasStarted(true)
    start()
  }

  if (!hasStarted) {
    return (
      <button className={styles.timerButton} onClick={onStart}>&gt;</button>
    )
  }
  if (isRunning) {
    return (
      <button className={styles.timerButton} onClick={pause}>||</button>
    )
  }
  return (
    <>
      <button className={styles.timerButton} onClick={resume}>&gt;</button>
      <button className={styles.timerButton} onClick={onRestart}>Restart</button>
    </>
  )
}
