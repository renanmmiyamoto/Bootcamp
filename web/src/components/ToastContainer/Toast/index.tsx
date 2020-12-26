import React, { useEffect } from 'react';
import {
	FiAlertCircle,
	FiXCircle,
	FiCheckCircle,
	FiInfo,
} from 'react-icons/fi';

import { Container } from './styles';

import { ToastMessage, useToast } from '../../../hooks/Toast';

interface ToastProps {
	message: ToastMessage;
	style: React.CSSProperties;
}

const Toast: React.FC<ToastProps> = ({ message, style }) => {
	const { removeToast } = useToast();

	const { id, type, title, description } = message;

	useEffect(() => {
		const timer = setTimeout(() => {
			removeToast(id);
		}, 3000);

		return () => {
			clearTimeout(timer);
		};
	}, [id, removeToast]);

	const icons = {
		info: <FiInfo size={24} />,
		error: <FiAlertCircle size={24} />,
		success: <FiCheckCircle size={24} />,
	};

	return (
		<Container type={type} hasDescription={!!description} style={style}>
			{icons[type || 'info']}

			<div>
				<strong>{title}</strong>
				{description && <p>{description}</p>}
			</div>

			<button type="button" onClick={() => removeToast(id)}>
				<FiXCircle size={18} />
			</button>
		</Container>
	);
};

export default Toast;
