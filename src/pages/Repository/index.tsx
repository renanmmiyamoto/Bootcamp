import React, { useEffect, useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useRouteMatch, Link } from 'react-router-dom';

import api from '../../services/api';

import { Header, RepositoryInfo, Issues } from './styles';

import logoImg from '../../assets/logo.svg';

interface RepositoryParams {
	full_name: string;
}

interface Repository {
	full_name: string;
	owner: {
		login: string;
		avatar_url: string;
	};
	description: string;
	stargazers_count: number;
	forks_count: number;
	open_issues_count: number;
}

interface Issue {
	id: string;
	title: string;
	html_url: string;
	user: {
		login: string;
	};
}

const Repository: React.FC = () => {
	const [repository, setRepository] = useState<Repository | null>(null);
	const [issues, setIssues] = useState<Issue[]>([]);
	const { params } = useRouteMatch<RepositoryParams>();

	useEffect(() => {
		const repositories = localStorage.getItem('@githubExplorer:repositories');

		if (repositories) {
			const repoFounded = JSON.parse(repositories).filter(
				(repo: Repository) => repo.full_name == params.full_name,
			);
			setRepository(repoFounded[0]);
		}

		const getIssues = async (): Promise<void> => {
			const { data } = await api.get<Issue[]>(
				`/repos/${params.full_name}/issues`,
			);
			setIssues(data);
		};

		getIssues();
	}, [params.full_name]);

	return (
		<>
			<Header>
				<img src={logoImg} alt="Github Explorer" />

				<Link to="/">
					<FiChevronLeft size={16} />
					Voltar
				</Link>
			</Header>

			{repository && (
				<RepositoryInfo>
					<header>
						<img
							src={repository.owner.avatar_url}
							alt={repository.owner.login}
						/>
						<div>
							<strong>{repository.full_name}</strong>
							<p>{repository.description}</p>
						</div>
					</header>

					<ul>
						<li>
							<strong>{repository.stargazers_count}</strong>
							<span>Stars</span>
						</li>
						<li>
							<strong>{repository.forks_count}</strong>
							<span>Forks</span>
						</li>
						<li>
							<strong>{repository.open_issues_count}</strong>
							<span>Issues abertas</span>
						</li>
					</ul>
				</RepositoryInfo>
			)}

			<Issues>
				{issues &&
					issues.map(issue => (
						<a href={issue.html_url} target="_blank" key={issue.id}>
							<div>
								<strong>{issue.title}</strong>
								<p>{issue.user.login}</p>
							</div>

							<FiChevronRight size={20} />
						</a>
					))}
			</Issues>
		</>
	);
};

export default Repository;
