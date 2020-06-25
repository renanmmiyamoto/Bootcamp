import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiChevronRight } from 'react-icons/fi';

import api from '../../services/api';

import logoImg from '../../assets/logo.svg';

import { Title, Form, Repositories, Error } from './styles';

interface Repository {
	full_name: string;
	owner: {
		login: string;
		avatar_url: string;
	};
	description: string;
}

const Dashboard: React.FC = () => {
	const [newRepository, setNewRepository] = useState('');
	const [inputError, setInputError] = useState('');
	const [repositories, setRepositories] = useState<Repository[]>(() => {
		const storagedRepositories = localStorage.getItem(
			'@githubExplorer:repositories',
		);

		if (storagedRepositories) return JSON.parse(storagedRepositories);

		return [];
	});

	useEffect(() => {
		localStorage.setItem(
			'@githubExplorer:repositories',
			JSON.stringify(repositories),
		);
	}, [repositories]);

	const handleAddRepository = async (
		e: React.FormEvent<HTMLFormElement>,
	): Promise<void> => {
		e.preventDefault();

		if (!newRepository) {
			setInputError('Digite o autor/nome do repositório');
			return;
		}

		try {
			const { data } = await api.get<Repository>(`/repos/${newRepository}`);

			setRepositories([...repositories, data]);

			setNewRepository('');
			setInputError('');
		} catch (error) {
			setInputError('Erro na busca por esse repositório');
		}
	};

	return (
		<>
			<img src={logoImg} alt="Github Explorer" />
			<Title>Explore repositórios no Github</Title>

			<Form hasError={!!inputError} onSubmit={handleAddRepository}>
				<input
					type="text"
					placeholder="Digite o nome do repositório"
					value={newRepository}
					onChange={e => setNewRepository(e.target.value)}
				/>
				<button type="submit">Pesquisar</button>
			</Form>

			{inputError && <Error>{inputError}</Error>}

			<Repositories>
				{repositories.map(repository => (
					<Link
						to={`/repository/${repository.full_name}`}
						key={repository.full_name}
					>
						<img
							src={repository.owner.avatar_url}
							alt={repository.owner.login}
						/>

						<div>
							<strong>{repository.full_name}</strong>
							<p>{repository.description}</p>
						</div>

						<FiChevronRight size={20} />
					</Link>
				))}
			</Repositories>
		</>
	);
};

export default Dashboard;
