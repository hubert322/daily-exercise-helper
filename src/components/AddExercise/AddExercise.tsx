import { Dispatch, SetStateAction, useState } from 'react'
import styles from './AddExercise.module.css'
import { ExerciseProps } from '../Exercise/Exercise'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'

interface AddExerciseProps {
  isAddExerciseOpen: boolean
  setIsAddExerciseOpen: Dispatch<SetStateAction<boolean>>
  onAddExercise: (exercise: ExerciseProps) => void
}

export default function AddExercise({ isAddExerciseOpen, setIsAddExerciseOpen, onAddExercise }: AddExerciseProps) {
  const [name, setName] = useState<string>("");
  const [nameIsEmpty, setNameIsEmpty] = useState<boolean | undefined>(undefined);
  const [time, setTime] = useState<string>("");

  function onClose() {
    setName("")
    setNameIsEmpty(undefined)
    setTime("")
    setIsAddExerciseOpen(false)
  }

  function isTimeValid(time: string) {
    if (!time) {
      return true
    }
    return new RegExp("[0-9][0-9]:[0-9][0-9]").test(time)
  }

  function onAdd() {
    if (!name) {
      setNameIsEmpty(true)
    } else if (!isTimeValid(time)) {
      alert("Time not valid")
    } else {
      const finalTime = time ? time : undefined
      onAddExercise({ name: name, time: finalTime })
      onClose()
    }
  }

  return (
    <Dialog open={isAddExerciseOpen} onClose={onClose}>
      <DialogTitle>Add Exercise</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          required
          error={nameIsEmpty}
          margin="dense"
          id="name"
          label="Name"
          type="text"
          fullWidth
          variant="standard"
          onChange={(e) => {
            console.log("YOOOOO")
            setName(e.target.value)
            setNameIsEmpty(!e.target.value)
          }}
        />
        <TextField
          margin="dense"
          id="time"
          label="Timer"
          type="text"
          fullWidth
          variant="standard"
          onChange={(e) => setTime(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onAdd}>Add</Button>
      </DialogActions>
    </Dialog >
  )
}
