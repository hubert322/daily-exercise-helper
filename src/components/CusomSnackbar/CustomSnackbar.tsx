import Snackbar from '@mui/material/Snackbar'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import Slide from '@mui/material/Slide'

interface CustomSnackbarProps {
  isSnackbarOpen: boolean
  onSnackbarClose: (event: React.SyntheticEvent | Event, reason?: string) => void
  snackbarMessage: string
}

export default function CustomSnackbar({
  isSnackbarOpen,
  onSnackbarClose,
  snackbarMessage
}: CustomSnackbarProps) {
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

  return (
    <Snackbar
      open={isSnackbarOpen}
      autoHideDuration={3000}
      onClose={onSnackbarClose}
      TransitionComponent={(props) => <Slide {...props} direction="up" />}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      action={snackbarAction}
      message={snackbarMessage}
    />
  )
}