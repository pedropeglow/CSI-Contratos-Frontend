import {
	Box,
	IconButton,
	ListItem,
	ListItemButton,
	Menu,
	MenuItem,
	Theme,
	useTheme,
} from '@mui/material';
import Background from '../components/background';
import { DesktopMenu } from '../components/menu/desktopMenu';
import { useEffect, useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import styled from '@emotion/styled';
import LogoImage from './../assets/csiLogo.png';
import { MySocios } from './socios/MySocios';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCSICareContext } from '../context';
import { Users } from './users/Users';
import { Link } from 'react-router-dom';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import PersonIcon from '@mui/icons-material/Person';
import { MyPessoaJuridica } from './pessoaJuridica/PessoaJuridica';

const Logo = styled('img')`
	height: 60px;
	width: auto;
`;

function App() {
	const theme = useTheme<Theme>();
	const navigate = useNavigate();

	const { getUser, user } = useCSICareContext();
	const [isMobile, setIsMobile] = useState(false);
	const [content, setContent] = useState(1);
	const [isMenuOpen, setMenuOpen] = useState(false);
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

	useEffect(() => {
		const handleResize = () => {
			if (window.screen.width > 600) setIsMobile(false);
			else setIsMobile(true);
		};
		handleResize();
		window.addEventListener('resize', handleResize);

		return () => window.removeEventListener('resize', handleResize);
	}, [isMobile]);

	const handleMenuButton = (event: any) => {
		setAnchorEl(event.currentTarget);

		!!isMenuOpen ? setMenuOpen(false) : setMenuOpen(true);
	};

	useEffect(() => {
		if (content == 1) navigate('/socios');
		if (content == 2) navigate('/pessoaJuridica');
		if (content == 3) navigate('/consultaContrato');
		if (content == 4) navigate('/gerarContrato');
		if (content == 6) navigate('/usuario/edit');
	}, [content]);

	useEffect(() => {
		getUser();
	}, []);

	return (
		<>
			<Background>
				<Box
					display='flex'
					flexDirection={!isMobile ? 'row' : 'column'}
					height='100%'
				>
					{!isMobile ? (
						<DesktopMenu
							content={content}
							setContent={setContent}
						/>
					) : (
						<>
							<Box
								display='flex'
								flexDirection='row'
								justifyContent='space-between'
								padding='10px'
							>
								<Logo src={LogoImage} />
								<IconButton
									color='inherit'
									onClick={handleMenuButton}
								>
									<MenuIcon />
								</IconButton>
							</Box>
							{!!isMenuOpen && (
								<Menu
									open={isMenuOpen}
									onClose={() => {
										setAnchorEl(null);
										setMenuOpen(false);
									}}
									anchorEl={anchorEl}
									anchorOrigin={{
										vertical: 'top',
										horizontal: 'right',
									}}
									transformOrigin={{
										vertical: 'top',
										horizontal: 'right',
									}}
								>
									<MenuItem
										onClick={() => {
											setContent(1);
											setMenuOpen(false);
										}}
									>
										Meus Sócios
									</MenuItem>
									<MenuItem
										onClick={() => {
											setContent(2);
											setMenuOpen(false);
										}}
									>
										Pessoa Jurídica
									</MenuItem>
									<MenuItem>
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
										<ExitToAppIcon />
									</IconButton>
									</ListItemButton>
									<ListItem>
									<ListItemButton
										style={{ display: 'flex', justifyContent: 'center' }}
										onClick={() => {setContent(6);
														setMenuOpen(false);}}
									>
										<PersonIcon fontSize='large' />
									</ListItemButton>
									</ListItem>
									</MenuItem>
								</Menu>
							)}
						</>
					)}
					{content == 1 ? (
						<MySocios />
					) : content == 2 ? (
						<MyPessoaJuridica />
					) :
					content == 6 ? (
						<Users />
					) : (
						<div> Página {content} ainda em construção</div>
					)}
				</Box>
			</Background>
		</>
	);
}

export default App;
