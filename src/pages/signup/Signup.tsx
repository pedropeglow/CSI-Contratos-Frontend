import { Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import {
	Container,
	Content,
	ErrorSpan,
	Form,
	Header,
	StyledTextField,
} from './styles';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Background from '../../components/background';
import logoImg from '../../assets/csi.png';
import { signup } from '../../services/signUpService';
import { useNavigate } from 'react-router-dom';

const schema = yup.object().shape({
	email: yup
		.string()
		.required('Campo e-mail obrigatório')
		.email('Digite um e-mail válido!'),
	password: yup
		.string()
		.required('Campo senha é obrigatório')
		.min(8, 'Senha deve conter no mínimo 8 dígitos'),
	confirmPassword: yup
		.string()
		.required('Campo senha é obrigatório')
		.min(8, 'Senha deve conter no mínimo 8 dígitos'),
});

interface FormData {
	email: string;
	password: string;
	confirmPassword: string;
}

export const Signup = () => {
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm<FormData>({
		mode: 'onChange',
		resolver: yupResolver(schema),
	});
	const onSubmit = async (data: FormData) => {
		try {
			await signup(data).then((response) => {
				navigate('/login');
			});
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Background>
			<Container>
				<Header>
					<a href='/'>
					<img
						src={logoImg}
						alt='Logo'
					/>
					</a>
					<span>Crie sua conta:</span>
				</Header>
				<Content>
					<Form
						style={{ border: '5px black' }}
						onSubmit={handleSubmit(onSubmit)}
					>

						<StyledTextField
							id='outlined-basic'
							label='E-mail'
							variant='outlined'
							{...register('email')}
						/>
						{errors.email && <ErrorSpan>{errors.email.message}</ErrorSpan>}
						<StyledTextField
							id='outlined-basic'
							label='Senha'
							variant='outlined'
							type='password'
							{...register('password', { required: true })}
						/>
						{errors.password && (
							<ErrorSpan>{errors.password.message}</ErrorSpan>
						)}
						<StyledTextField
							id='outlined-basic'
							label='Confirmar Senha'
							variant='outlined'
							type='password'
							{...register('confirmPassword', { required: true })}
						/>
						{errors.confirmPassword && (
							<ErrorSpan>{errors.confirmPassword.message}</ErrorSpan>
						)}
						<Button
							style={{
								backgroundColor: '#1876F2',
								color: '#fff',
								width: '100%',
							}}
							disabled={!isValid}
							variant='contained'
							type='submit'
						>
							Cadastrar-se
						</Button>
					</Form>
				</Content>
			</Container>
		</Background>
	);
};
