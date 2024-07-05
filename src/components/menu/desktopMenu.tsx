import styled from '@emotion/styled';
import {
	Box,
	ListItem,
	ListItemButton,
} from '@mui/material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import pdfImage from './../../assets/csiLogo.png';
import { MenuProps } from './types';
import { IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../utils/logout';

const Menu = styled(Box)`
	display: flex;
	width: 200px;
	align-items: center;
	margin: 0px;
`;

const Logo = styled('img')`
	height: 80px;
	width: 100px;
	padding: 20px;
`;


export const DesktopMenu = ({ content, setContent }: MenuProps) => {

	const navigate = useNavigate();

	const handleLogout = () => {
		logout();
		navigate('/login');
	};

	return (
		<Menu
			position='relative'
			flexDirection='column'
			width='200px'
		>
			<Logo src={pdfImage} />
			<ListItem>
				<ListItemButton onClick={() => setContent(1)}>Meus Sócios</ListItemButton>
			</ListItem>
			<ListItem>
				<ListItemButton onClick={() => setContent(2)}>Pessoa Jurídica</ListItemButton>
			</ListItem>
			<ListItem>
			<ListItemButton
				style={{ display: 'flex', justifyContent: 'center' }}
				onClick={handleLogout}>
				<IconButton
					color='inherit'
					aria-label='Logout'>
					<ExitToAppIcon style={{ color: 'grey' }} />
				</IconButton>
			</ListItemButton>
			</ListItem>
		</Menu>
	);
};
