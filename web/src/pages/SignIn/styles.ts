import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';

import signInBackground from '../../assets/sign-in-background.png';

export const Container = styled.div`
	height: 100vh;

	display: flex;
	align-items: stretch;
`;

export const Content = styled.div`
	display: flex;
	flex-direction: column;
	place-content: center;

	width: 100%;
	max-width: 700px;
`;

export const Background = styled.div`
	flex: 1;
	background: url(${signInBackground}) no-repeat center;
	background-size: cover;
`;

const appearFromLeft = keyframes`
	from {
		opacity: 0;
		transform: translateX(-50%);
	}

	to {
		opacity: 1;
		transform: translateX(0);
	}
`;

export const AnimationContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;

	animation: ${appearFromLeft} 1s;

	form {
		width: 340px;

		margin: 80px 0;

		text-align: center;

		h1 {
			margin-bottom: 24px;
		}

		a {
			display: block;

			color: #f4ede8;
			text-decoration: none;

			margin-top: 24px;

			transition: 0.2s;

			&:hover {
				color: ${shade(0.2, '#f4ede8')};
			}
		}
	}

	> a {
		display: flex;
		align-items: center;

		color: #ff9000;
		text-decoration: none;

		margin-top: 24px;

		transition: 0.2s;

		&:hover {
			color: ${shade(0.2, '#ff9000')};
		}

		svg {
			margin-right: 16px;
		}
	}
`;
