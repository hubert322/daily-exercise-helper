import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Fallback() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>Your New Year&apos;s Resolution</p>
        <div>By Hubert Hung</div>
      </div>
      <div className={styles.center}>
        <h1 className={inter.className}>Daily Exercise Helper</h1>
      </div>
      <div className={styles.grid}>
        <p>You&pos;re currently offline</p>
      </div>
    </main>
  )
}