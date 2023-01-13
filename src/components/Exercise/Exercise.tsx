import { Inter } from '@next/font/google'
import Timer from '../Timer/Timer'
import styles from './Exercise.module.css'

const inter = Inter({ subsets: ['latin'] })

interface ExerciseProps {
  name: string
  time?: string
}

export default function Exercise({ name, time }: ExerciseProps) {
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
