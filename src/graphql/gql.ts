// FIXME: connected with modules setting in TS config, but setup is ok
import { gql, GraphQLClient } from 'graphql-request';
import { Repository } from '@/types/repository';

// FIXME: process.env deprecated, but TS doesnt recognize it..tsconfig ok
const GITHUB_TOKEN = import.meta.env.VITE_PUBLIC_GITHUB_TOKEN;

if (!GITHUB_TOKEN) {
	throw new Error('GitHub token not found in environment variables');
}

const client = new GraphQLClient('https://api.github.com/graphql', {
	headers: {
		Authorization: `Bearer ${GITHUB_TOKEN}`,
	},
});

const createQuery = (owners: string[], first: number) => {
	const ownerQueries = owners.map(
		(owner, index) => `
      user${index}: repositoryOwner(login: "${owner}") {
        repositories(first: ${first}, privacy: PUBLIC) {
          nodes {
            id
            name
            description
            createdAt
            updatedAt
            stargazerCount
            forkCount
            issues {
              totalCount
            }
            primaryLanguage {
              name
            }
            owner {
              login
              avatarUrl
            }
          }
        }
      }
    `
	);

	return gql`
    query GetRepositories {
      ${ownerQueries.join('\n')}
    }
  `;
};

interface RepositoriesResponse {
	[key: string]: {
		repositories: {
			nodes: Repository[];
		};
	};
}

export const getRepositoriesForMultipleUsers = async (
	owners: string[],
	first: number = 10
): Promise<Record<string, Repository[]>> => {
	try {
		const query = createQuery(owners, first);
		const data: RepositoriesResponse =
			await client.request<RepositoriesResponse>(query);

		return owners.reduce(
			(acc, owner, index) => {
				acc[owner] = data[`user${index}`].repositories.nodes;
				return acc;
			},
			{} as Record<string, Repository[]>
		);
	} catch (error) {
		console.error('Error fetching repositories:', error);
		return {};
	}
};
