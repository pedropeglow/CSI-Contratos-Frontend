import { Box, Typography } from '@mui/joy';
import Socio from './../assets/socios.png';

export const StartHere = ({ title }: { title: string }) => {
	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<img
				src={Socio}
				style={{ height: '200px' }}
			/>
			<Typography style={{ fontSize: '20px', fontWeight: 700 }}>
				{title}
			</Typography>
		</Box>
	);
};
