import styled from '@emotion/styled';
import {
	Box,
	ListItem,
	ListItemButton,
} from '@mui/material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import pdfImage from './../../assets/pdf.png';
import { MenuProps } from './types';
import PersonIcon from '@mui/icons-material/Person';
import { IconButton } from '@mui/material';
import { Link } from 'react-router-dom';

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
				<ListItemButton onClick={() => setContent(3)}>Consultar Contrato</ListItemButton>
			</ListItem>
			<ListItem>
				<ListItemButton onClick={() => setContent(3)}>Gerar Contrato</ListItemButton>
			</ListItem>
			<ListItem style={{ position: 'absolute', bottom: '0px' }}>
				<ListItemButton
					style={{ display: 'flex', justifyContent: 'center' }}
					component={Link}
					to='/login'
				>
					{' '}
					<IconButton
						color='inherit'
						aria-label='Logout'
					>
						<ExitToAppIcon style={{ color: 'grey' }} />
					</IconButton>
				</ListItemButton>
				<ListItem>
					<ListItemButton
						style={{ display: 'flex', justifyContent: 'center' }}
						onClick={() => setContent(6)}
					>
						<PersonIcon
							fontSize='large'
							style={{ color: 'grey' }}
						/>
					</ListItemButton>
				</ListItem>
			</ListItem>
		</Menu>
	);
};
