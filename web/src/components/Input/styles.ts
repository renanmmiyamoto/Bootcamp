import styled, { css } from 'styled-components';

import Tooltip from '../Tooltip';

interface ContainerProps {
	isFocused: boolean;
	isFilled: boolean;
	isErrored: boolean;
}

export const Container = styled.label<ContainerProps>`
	background: #212129;
	display: flex;
	align-items: center;

	width: 100%;
	color: #666360;

	padding: 16px;

	border-radius: 10px;
	border: 2px solid #212129;

	${p =>
		p.isErrored &&
		css`
			border-color: #c53030;
		`}

	${p =>
		p.isFocused &&
		css`
			color: #ff9000;
			border-color: #ff9000;
		`}

	${p =>
		p.isFilled &&
		css`
			color: #ff9000;
		`}

	svg {
		margin-right: 16px;
	}

	input {
		background: transparent;
		flex: 1;
		color: #f4ede8;
		border: 0;

		&::placehoder {
			color: #666360;
		}
	}

	& + label {
		margin-top: 8px;
	}
`;

export const Error = styled(Tooltip)`
	height: 20px;
	margin-left: 16px;

	svg {
		margin: 0;
	}

	span {
		background: #c53030;
		color: #fff;

		&::before {
			border-color: #c53030 transparent;
		}
	}
`;
