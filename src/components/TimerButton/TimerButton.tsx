import { Dispatch, SetStateAction } from 'react'
import styles from './TimerButton.module.css'
import { VscDebugStart, VscDebugPause, VscDebugContinue, VscDebugRestart } from 'react-icons/vsc'
import { IconContext } from 'react-icons'

interface TimerButtonProps {
  hasStarted: boolean
  setHasStarted: Dispatch<SetStateAction<boolean>>
  isRunning: boolean
  start: () => void
  pause: () => void
  resume: () => void
  onRestart: () => void
  size: string
}

export default function TimerButton({ hasStarted, setHasStarted, isRunning, start, pause, resume, onRestart, size }: TimerButtonProps) {

  function onStart() {
    setHasStarted(true)
    start()
  }

  if (!hasStarted) {
    return (
      <IconContext.Provider value={{ size: size }}>
        <button className={styles.timerButton} onClick={onStart}>
          <VscDebugStart />
        </button>
      </IconContext.Provider>
    )
  }
  if (isRunning) {
    return (
      <IconContext.Provider value={{ size: size }}>
        <button className={styles.timerButton} onClick={pause}>
          <VscDebugPause />
        </button>
      </IconContext.Provider>
    )
  }
  return (
    <>
      <IconContext.Provider value={{ size: size }}>
        <button className={styles.timerButton} onClick={resume}>
          <VscDebugContinue />
        </button>
      </IconContext.Provider>
      <IconContext.Provider value={{ size: size }}>
        <button className={styles.timerButton} onClick={onRestart}>
          <VscDebugRestart />
        </button>
      </IconContext.Provider>
    </>
  )
}