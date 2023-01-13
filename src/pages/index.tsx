import Head from 'next/head'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import Exercise from '../components/Exercise/Exercise'

const inter = Inter({ subsets: ['latin'] })

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
