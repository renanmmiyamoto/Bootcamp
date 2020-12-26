import styled from 'styled-components';

export const Container = styled.div`
	position: relative;

	span {
		background: #ff9000;
		position: absolute;
		left: 50%;
		bottom: calc(100% + 12px);
		width: 160px;

		color: #312e38;
		font-size: 14px;
		font-weight: 500;

		padding: 8px;
		border-radius: 4px;
		opacity: 0;
		visibility: hidden;
		transition: 0.4s;
		transform: translateX(-50%);

		&::before {
			content: '';

			position: absolute;
			top: 100%;
			left: 50%;
			transform: translateX(-50%);

			border-style: solid;
			border-color: #ff9000 transparent;
			border-width: 6px 6px 0 6px;
		}
	}

	&:hover span {
		opacity: 1;
		visibility: visible;
	}
`;
