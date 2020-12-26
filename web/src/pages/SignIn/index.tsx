import React, { useCallback, useRef } from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';

import { Container, Content, AnimationContainer, Background } from './styles';

import Input from '../../components/Input';
import Button from '../../components/Button';

import logoImg from '../../assets/logo.svg';
import getValidationErrors from '../../utils/getValidationErrors';

import { useAuth } from '../../hooks/Auth';
import { useToast } from '../../hooks/Toast';

interface SignInFormData {
	email: string;
	password: string;
}

const SignIn: React.FC = () => {
	const formRef = useRef<FormHandles>(null);

	const { signIn } = useAuth();
	const { addToast } = useToast();

	const history = useHistory();

	const handleSubmit = useCallback(
		async (data: SignInFormData): Promise<void> => {
			try {
				formRef.current?.setErrors({});

				const schema = Yup.object().shape({
					email: Yup.string()
						.required('E-mail obrigatório')
						.email('Digite um e-mail válido'),
					password: Yup.string().required('Senha obrigatória'),
				});

				await schema.validate(data, {
					abortEarly: false,
				});

				await signIn({ email: data.email, password: data.password });

				history.push('/dashboard');
			} catch (err) {
				if (err instanceof Yup.ValidationError) {
					const errors = getValidationErrors(err);

					formRef.current?.setErrors(errors);

					return;
				}

				addToast({
					type: 'error',
					title: 'Erro na autenticação',
					description: 'Ocorreu um erro ao fazer login, cheque as credenciais.',
				});
			}
		},
		[signIn, addToast, history],
	);

	return (
		<Container>
			<Content>
				<AnimationContainer>
					<img src={logoImg} alt="GoBarber" />

					<Form onSubmit={handleSubmit} ref={formRef}>
						<h1>Faça seu logon</h1>

						<Input name="email" icon={FiMail} placeholder="E-mail" />

						<Input
							type="password"
							name="password"
							icon={FiLock}
							placeholder="Senha"
						/>

						<Button type="submit">Entrar</Button>

						<Link to="forgot">Esqueci minha senha</Link>
					</Form>

					<Link to="/signup">
						<FiLogIn />
						Criar conta
					</Link>
				</AnimationContainer>
			</Content>

			<Background />
		</Container>
	);
};

export default SignIn;
