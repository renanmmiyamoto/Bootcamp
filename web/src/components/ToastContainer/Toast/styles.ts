import styled, { css } from 'styled-components';
import { animated } from 'react-spring';

interface ContainerProps {
	type?: 'success' | 'error' | 'info';
	hasDescription: boolean;
}

const toastTypeVariations = {
	info: css`
		background: #ebf8ff;
		color: #3172b7;
	`,
	success: css`
		background: #e6fffa;
		color: #2e656a;
	`,
	error: css`
		background: #fddede;
		color: #c53030;
	`,
};

export const Container = styled(animated.div)<ContainerProps>`
	position: relative;

	width: 360px;
	padding: 16px 30px 16px 16px;
	border-radius: 10px;
	box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);

	background: #ebf8ff;
	color: #3172b7;

	${p => toastTypeVariations[p.type || 'info']}

	display: flex;

	& + div {
		margin-top: 8px;
	}

	> svg {
		margin: 4px 12px 0 0;
	}

	div {
		flex: 1;

		p {
			font-size: 14px;
			line-height: 20px;
			margin: 4px 0 0;
			opacity: 0.8;
		}
	}

	button {
		background: transparent;
		position: absolute;
		top: 19px;
		right: 16px;

		color: inherit;

		opacity: 0.6;
		border: 0;
	}

	${p =>
		!p.hasDescription &&
		css`
			align-items: center;

			> svg {
				margin-top: 0;
			}

			button
		`}
`;
