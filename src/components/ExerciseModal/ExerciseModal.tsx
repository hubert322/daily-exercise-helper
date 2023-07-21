import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import styles from './ExerciseModal.module.css'
import { ExerciseObj } from '../Exercise/Exercise'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'

interface ExerciseModalProps {
  isExerciseModalOpen: boolean
  setIsExerciseModalOpen: Dispatch<SetStateAction<boolean>>
  modalCurrentExercise: ExerciseObj
  onSave: (exercise: ExerciseObj) => void
}

export default function ExerciseModal({
  isExerciseModalOpen,
  setIsExerciseModalOpen,
  modalCurrentExercise,
  onSave
}: ExerciseModalProps) {
  const DEFAULT_NAME_IS_EMPTY = undefined

  const [name, setName] = useState<string>("")
  const [nameIsEmpty, setNameIsEmpty] = useState<boolean | undefined>(DEFAULT_NAME_IS_EMPTY)
  const [category, setCategory] = useState<string>("")
  const [frequency, setFrequency] = useState<string>("")
  const [time, setTime] = useState<string | undefined>("")

  function onClose() {
    setIsExerciseModalOpen(false)
  }

  function isTimeValid(time: string | undefined) {
    if (!time) {
      return true
    }
    return new RegExp("[0-9][0-9]:[0-9][0-9]").test(time)
  }

  function beforeOnSave() {
    if (!name) {
      setNameIsEmpty(true)
    } else if (!isTimeValid(time)) {
      alert("Time not valid")
    } else {
      const exercise: ExerciseObj = {
        name: name,
        category: category,
        frequency: frequency,
      }
      if (time) {
        exercise.time = time
      }
      onSave(exercise)
      onClose()
    }
  }

  useEffect(() => {
    if (isExerciseModalOpen) {
      setName(modalCurrentExercise.name)
      setNameIsEmpty(DEFAULT_NAME_IS_EMPTY)
      setCategory(modalCurrentExercise.category)
      setFrequency(modalCurrentExercise.frequency)
      setTime(modalCurrentExercise.time)
    }
  }, [isExerciseModalOpen])

  return (
    <Dialog open={isExerciseModalOpen} onClose={onClose}>
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
          value={name}
          onChange={(e) => {
            setName(e.target.value)
            setNameIsEmpty(!e.target.value)
          }}
        />
        <TextField
          margin="dense"
          id="category"
          label="Category"
          type="text"
          fullWidth
          variant="standard"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <TextField
          margin="dense"
          id="frequency"
          label="Frequency"
          type="text"
          fullWidth
          variant="standard"
          value={frequency}
          onChange={(e) => setFrequency(e.target.value)}
        />
        <TextField
          margin="dense"
          id="time"
          label="Timer"
          type="text"
          fullWidth
          variant="standard"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={beforeOnSave}>Save</Button>
      </DialogActions>
    </Dialog >
  )
}
