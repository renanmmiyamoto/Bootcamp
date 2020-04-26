import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled(RectButton)`
	background: #ff9000;
	width: 100%;
	height: 60px;
	justify-content: center;
	align-items: center;
	padding: 0 30px;
	border-radius: 10px;
`;

export const ButtonText = styled.Text`
	font-family: 'RobotoSlab-Medium';
	font-size: 18px;
	color: #312e38;
`;
