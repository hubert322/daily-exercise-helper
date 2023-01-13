import { useState } from 'react'
import { useTimer } from 'react-timer-hook'
import { Inter } from '@next/font/google'
import TimerButton from '../TimerButton/TimerButton'

const inter = Inter({ subsets: ['latin'] })

interface TimerProps {
  time: string
}

export default function Timer({ time }: TimerProps) {
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