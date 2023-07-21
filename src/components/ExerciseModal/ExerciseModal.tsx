import { Dispatch, MutableRefObject, SetStateAction, useEffect, useState } from 'react'
import styles from './ExerciseModal.module.css'
import { ExerciseObj } from '../Exercise/Exercise'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'

interface ExerciseModalProps {
  modalTitle: string
  isExerciseModalOpen: boolean
  setIsExerciseModalOpen: Dispatch<SetStateAction<boolean>>
  modalCurrentExercise: ExerciseObj
  onSave: MutableRefObject<(exercise: ExerciseObj) => Promise<void>>
}

export default function ExerciseModal({
  modalTitle,
  isExerciseModalOpen,
  setIsExerciseModalOpen,
  modalCurrentExercise,
  onSave
}: ExerciseModalProps) {
  const DEFAULT_NAME_IS_EMPTY = undefined

  const [id, setId] = useState<string | undefined>(undefined)
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
      if (id) {
        exercise.id = id
      }
      if (time) {
        exercise.time = time
      }
      onSave.current(exercise)
      onClose()
    }
  }

  useEffect(() => {
    if (isExerciseModalOpen) {
      setId(modalCurrentExercise.id)
      setName(modalCurrentExercise.name)
      setNameIsEmpty(DEFAULT_NAME_IS_EMPTY)
      setCategory(modalCurrentExercise.category)
      setFrequency(modalCurrentExercise.frequency)
      setTime(modalCurrentExercise.time ? modalCurrentExercise.time : "")
    }
  }, [isExerciseModalOpen])

  return (
    <Dialog open={isExerciseModalOpen} onClose={onClose}>
      <DialogTitle>{modalTitle}</DialogTitle>
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
