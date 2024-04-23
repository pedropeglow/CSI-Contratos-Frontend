import { Snackbar, Alert } from '@mui/material';
import { useCSICareContext } from '../../context';

const SnackbarComponent = () => {
	const { snackbarOpen, setSnackbarOpen } = useCSICareContext();
	const handleCloseSnackbar = () => {
		setSnackbarOpen({
			status: false,
			type: '',
			message: '',
		});
	};
	return (
		<Snackbar
			anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
			open={!!snackbarOpen.status}
			autoHideDuration={3000}
			onClose={handleCloseSnackbar}
		>
			<Alert severity={snackbarOpen.type}>{snackbarOpen.message}</Alert>
		</Snackbar>
	);
};

export default SnackbarComponent;
