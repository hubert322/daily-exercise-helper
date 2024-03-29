import { useState } from 'react'
import { useTimer } from 'react-timer-hook'
import { Inter } from '@next/font/google'
import TimerButton from '../TimerButton/TimerButton'
import styles from './Timer.module.css'

const inter = Inter({ subsets: ['latin'] })

interface TimerProps {
  time: string
  notifyOnExpire: () => void
}

export default function Timer({ time, notifyOnExpire }: TimerProps) {
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
    notifyOnExpire()
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
    <div className={styles.timerContainer}>
      <TimerButton hasStarted={hasStarted} setHasStarted={setHasStarted} isRunning={isRunning} start={start} pause={pause} resume={resume} onRestart={onRestart} size="1.5rem" />
      <p className={inter.className}>{getTimeLeft(minutes, seconds)}</p>
    </div>
  )
}