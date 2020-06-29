import styled from 'styled-components';

export const Container = styled.div`
	position: relative;

	span {
		background: #ff9000;
		width: 160px;
		font-size: 14px;
		color: #312e38;
		font-weight: 500;
		padding: 8px;
		border-radius: 4px;
		opacity: 0;
		visibility: hidden;
		transition: 0.4s ease-in-out;

		position: absolute;
		bottom: calc(100% + 12px);
		left: 50%;
		transform: translateX(-50%);

		&::before {
			content: '';
			border-style: solid;
			border-color: #ff9000 transparent;
			border-width: 6px 6px 0 6px;

			position: absolute;
			bottom: 20px;
			top: 100%;
			left: 50%;
			transform: translateX(-50%);
		}
	}

	&:hover span {
		opacity: 1;
		visibility: visible;
	}
`;
