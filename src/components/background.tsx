import styled from '@emotion/styled';
import {
	Box,
	Container,
	Paper,
	css,
	useTheme,
} from '@mui/material';

interface Props {
	color?: string;
	theme: any;
}

const Wrapper = styled(Container)<Props>`
	${({ theme }) => css`
		background-color: #BBEAEC;
		height: 100vh;
		width: 100vw;
		display: grid;
		align-content: space-around;
		position: relative;
		margin: 0;
		padding: 0;

		${theme.breakpoints.down('sm')} {
			align-content: space-between;
			padding-top: 20px;
			padding-bottom: 20px;
		}

		${theme.breakpoints.up('sm')} {
			max-width: 100%;
		}
	`}
`;

const Card = styled(Paper)<Props>`
	${({ theme }) => css`
		height: calc(100% - 100px);
		margin-top: 50px;
		margin-bottom: 50px;
		width: calc(100vw - 150px);
		max-width: 1200px;
		border-radius: 20px;
		overflow: auto;
		${theme.breakpoints.down('sm')} {
			width: calc(100vw - 50px);
			height: calc(100% - 50px);
		}
	`}
`;

const Background = ({ children }: { children: JSX.Element | any }) => {
	const theme = useTheme();

	return (
		<Wrapper theme={theme}>
			<Box
				sx={{
					position: 'absolute',
					zIndex: 1,
					width: '100vw',
					height: '100vh',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<Card
					elevation={0}
					theme={theme}
				>
					{children}
				</Card>
			</Box>
		</Wrapper>
	);
};

export default Background;
