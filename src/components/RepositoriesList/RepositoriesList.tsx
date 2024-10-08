import React, { useEffect, useState } from 'react';
import { getRepositoriesForMultipleUsers } from '@/graphql/gql';
import { Repository } from '@/types/repository';

type RepositoriesProps = {
	owners: string[];
};

export default function RepositoriesList({ owners }: RepositoriesProps) {
	const [repositories, setRepositories] = useState<
		Record<string, Repository[]>
	>({});
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchRepositories = async () => {
			try {
				const repoData: Record<string, Repository[]> =
					await getRepositoriesForMultipleUsers(owners);
				if (Object.keys(repoData).length > 0) {
					setRepositories(repoData);
				} else {
					setError('No repositories found.');
				}
			} catch (error) {
				console.error('Error fetching repositories:', error);
				setError('Error fetching repositories.');
			} finally {
				setLoading(false);
			}
		};

		void fetchRepositories();
	}, [owners]);

	if (loading) {
		return <p>Loading...</p>;
	}

	if (error) {
		return <p>{error}</p>;
	}

	return (
		<div className="grid grid-cols-2 gap-5">
			{Object.entries(repositories).map(([owner, repos]) => {
				const ownerData = repos[0]?.owner;
				const profileUrl = `https://github.com/${ownerData.login}`; // construct profile URL

				return (
					<div key={owner} className="card-container items-start">
						<a href={profileUrl} target="_blank" rel="noopener">
							<div className="flex items-center gap-5 mb-4">
								<img
									src={ownerData.avatarUrl}
									alt={`${ownerData.login}'s avatar`}
									width={40}
									height={40}
									className="rounded-full items-center"
								/>
								<h2 className="title font-bold">
									{ownerData.name || ownerData.login}
								</h2>
							</div>
						</a>
						{repos.slice(0, 2).map((repo) => (
							<div key={repo.id} className="mb-4">
								<h3 className="text-base font-semibold">
									{repo.name}
								</h3>
								<p>{repo.description}</p>
								<p>
									Updated at:{' '}
									{new Date(repo.updatedAt).toLocaleString()}
								</p>
								<p>Stars: {repo.stargazerCount}</p>
								<p>
									Primary Language:{' '}
									{repo.primaryLanguage?.name || 'N/A'}
								</p>
							</div>
						))}
					</div>
				);
			})}
		</div>
	);
}
