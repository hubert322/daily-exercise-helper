import { useEffect, useState } from 'react'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import { MdAddBox } from 'react-icons/md'
import { IconContext } from 'react-icons'
import Exercise, { ExerciseProps } from '../components/Exercise/Exercise'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getFirestore, addDoc, collection, getDocs } from 'firebase/firestore'
import ExerciseModal from '../components/ExerciseModal/ExerciseModal'
import Snackbar from '@mui/material/Snackbar'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import Slide from '@mui/material/Slide'

const inter = Inter({ subsets: ['latin'] })
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});
const firebaseConfig = {
  apiKey: "AIzaSyBFndvh9ylrGp5wHlhuWd8hx0aYpWTmwsU",
  authDomain: "daily-exercise-helper.firebaseapp.com",
  projectId: "daily-exercise-helper",
  storageBucket: "daily-exercise-helper.appspot.com",
  messagingSenderId: "733944098758",
  appId: "1:733944098758:web:3419e29232cd59d2d88cc7",
  measurementId: "G-0M139QQR3G"
};

export default function Home() {
  const app = initializeApp(firebaseConfig)
  const analytics = app.name && typeof window !== 'undefined' ? getAnalytics(app) : null
  const db = getFirestore(app)

  const NEW_EXERCISE: ExerciseProps = {
    name: "",
    category: "General",
    frequency: "Daily",
    time: ""
  }

  const [exercises, setExercises] = useState<ExerciseProps[]>([])
  const [isExerciseModalOpen, setIsExerciseModalOpen] = useState(false)
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState("")
  const [modalCurrentExercise, setModalCurrentExercise] = useState(NEW_EXERCISE)

  useEffect(() => {
    (async () => {
      if (Notification.permission === "default") {
        const request = await Notification.requestPermission()
        alert(request)
        if (request !== "granted") {
          alert("You will not be receiving notifications when the exercise timer is up. To change this, go to settings and enable notification permissions.")
        }
      }

      try {
        const querySnapshot = await getDocs(collection(db, "exercises"))
        const initialExercises: ExerciseProps[] = []
        querySnapshot.forEach((doc) => initialExercises.push(doc.data() as ExerciseProps))
        setExercises(initialExercises)
      } catch (e) {
        alert("Error retrieving exercises: " + e)
      }
    })()
  }, [])

  function openSnackbar(exercise: ExerciseProps) {
    setIsSnackbarOpen(true)
    setSnackbarMessage("Added exercise " + exercise.name)
  }

  function onSnackbarClose(event: React.SyntheticEvent | Event, reason?: string) {
    if (reason === "clickaway") {
      return
    }
    setIsSnackbarOpen(false)
  }

  const snackbarAction = (
    <>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={onSnackbarClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  )

  async function onAddExercise(exercise: ExerciseProps) {
    try {
      await addDoc(collection(db, "exercises"), exercise);
      setExercises([...exercises, exercise])
      openSnackbar(exercise)
    } catch (e) {
      alert("Error adding exercise: " + e)
    }
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
          <IconContext.Provider value={{ size: "3rem" }}>
            <button onClick={() => setIsExerciseModalOpen(true)}>
              <MdAddBox />
            </button>
          </IconContext.Provider>
          <button onClick={() => setIsSnackbarOpen(true)}>Open Snackbar</button>
        </div>
        <ExerciseModal
          isExerciseModalOpen={isExerciseModalOpen}
          setIsExerciseModalOpen={setIsExerciseModalOpen}
          modalCurrentExercise={modalCurrentExercise}
          onSave={onAddExercise}
        />
        <Snackbar
          open={isSnackbarOpen}
          autoHideDuration={3000}
          onClose={onSnackbarClose}
          TransitionComponent={(props) => <Slide {...props} direction="up" />}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          action={snackbarAction}
          message={snackbarMessage}
        />
      </main>
    </ThemeProvider>
  )
}
