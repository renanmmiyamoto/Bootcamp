import styled, { css } from 'styled-components';
import { shade } from 'polished';

export const Title = styled.h1`
	max-width: 450px;
	font-size: 48px;
	color: #3a3a3a;
	line-height: 56px;

	margin-top: 80px;
`;

export const Form = styled.form<{ hasError: boolean }>`
	max-width: 715px;
	display: flex;
	align-items: stretch;
	margin-top: 40px;

	input {
		flex: 1;
		height: 70px;
		color: #3a3a3a;
		padding: 0 24px;
		border: 1px solid #fff;
		border-right: 0;
		border-radius: 5px 0 0 5px;

		${p =>
			p.hasError &&
			css`
				border-color: #c53030;
			`}

		&::placeholder {
			color: #a8a8b3;
		}
	}

	button {
		background: #04d361;
		width: 210px;
		height: 70px;
		color: #fff;
		font-weight: bold;
		border: 0;
		border-radius: 0 5px 5px 0;
		transition: background-color 0.2s;

		&:hover {
			background: ${shade(0.2, `#04d361`)};
		}
	}
`;

export const Error = styled.span`
	display: block;
	color: #c53030;
	margin-top: 8px;
`;

export const Repositories = styled.div`
	max-width: 715px;
	margin-top: 80px;

	a {
		background: #fff;
		display: flex;
		align-items: center;
		width: 100%;
		padding: 24px;
		text-decoration: none;
		border-radius: 5px;
		transition: transform 0.2s;

		& + a {
			margin-top: 16px;
		}

		&:hover {
			transform: translateX(10px);
		}

		img {
			width: 64px;
			height: 64px;
			border-radius: 50%;
		}

		div {
			flex: 1;
			margin: 0 16px;

			strong {
				font-size: 20px;
				color: #3d3d4d;
			}

			p {
				font-size: 18px;
				color: #a8a8b3;
				margin-top: 4px;
			}
		}

		svg {
			margin-left: auto;
			color: #cbcdd6;
		}
	}
`;
