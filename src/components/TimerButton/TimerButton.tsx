import { Dispatch, SetStateAction } from "react"
import styles from './TimerButton.module.css'

interface TimerButtonProps {
  hasStarted: boolean
  setHasStarted: Dispatch<SetStateAction<boolean>>
  isRunning: boolean
  start: () => void
  pause: () => void
  resume: () => void
  onRestart: () => void
}

export default function TimerButton({ hasStarted, setHasStarted, isRunning, start, pause, resume, onRestart }: TimerButtonProps) {

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