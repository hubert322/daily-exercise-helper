import { useEffect, useState } from 'react'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import { MdAddBox } from 'react-icons/md'
import { IconContext } from 'react-icons'
import Exercise, { ExerciseProps } from '../components/Exercise/Exercise'
import AddExercise from '../components/AddExercise/AddExercise'
import { ThemeProvider, createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [exercises, setExercises] = useState<ExerciseProps[]>([])
  const [isAddExerciseOpen, setIsAddExerciseOpen] = useState(false)

  useEffect(() => {
    (async () => {
      if (Notification.permission === "default") {
        const request = await Notification.requestPermission()
        alert(request)
        if (request !== "granted") {
          alert("You will not be receiving notifications when the exercise timer is up. To change this, go to settings and enable notification permissions.")
        }
      }
    })()
    setExercises([
      {
        name: "Drunk Spiderwalk",
        time: "5:00",
      },
      {
        name: "Vocal Warmups",
        time: "00:02"
      },
      {
        name: "Laundry"
      },
      {
        name: "Random"
      }
    ])
  }, [])

  function onAddExercise(exercise: ExerciseProps) {
    setExercises([...exercises, exercise])
  }

  return (
    <ThemeProvider theme={darkTheme}>
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
          <IconContext.Provider value={{ size: "1.5rem" }}>
            <button onClick={() => setIsAddExerciseOpen(true)}>
              <MdAddBox />
            </button>
          </IconContext.Provider>
          <AddExercise
            isAddExerciseOpen={isAddExerciseOpen}
            setIsAddExerciseOpen={setIsAddExerciseOpen}
            onAddExercise={onAddExercise}
          />
        </div>
      </main>
    </ThemeProvider>
  )
}
