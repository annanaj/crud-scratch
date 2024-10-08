import React, { useEffect, useState } from 'react';
import { RiDeleteBin5Line, RiEdit2Fill } from 'react-icons/ri';

import { Button } from '@/components/ui/button';

import styles from './UsersList.module.scss';
import {
	fetchUsers,
	createUser,
	updateUser,
	deleteUser,
} from '../../services/api';

type UsersList = {
	id: number;
	name: string;
	email: string;
};

export default function UsersList() {
	const [users, setUsers] = useState<UsersList[]>([]);
	const [newUser, setNewUser] = useState({ name: '', email: '' });
	const [emailError, setEmailError] = useState('');
	const [editingUser, setEditingUser] = useState<UsersList | null>(null);
	const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;

	const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setNewUser({ ...newUser, email: e.target.value });
		if (emailError) setEmailError('');
	};

	useEffect(() => {
		fetchUsersData();
	}, []);

	const fetchUsersData = async () => {
		try {
			const response = await fetchUsers();
			setUsers(response.data);
		} catch (error) {
			console.error(error);
		}
	};

	const handleCreateUser = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			await createUser(newUser);
			fetchUsersData();
			setNewUser({ name: '', email: '' });
		} catch (error) {
			console.error(error);
		}
	};

	const handleUpdateUser = async () => {
		if (editingUser) {
			try {
				await updateUser(editingUser.id, editingUser);
				fetchUsersData();
				setEditingUser(null);
			} catch (error) {
				console.error(error);
			}
		}
	};

	const handleDeleteUser = async (id: number) => {
		try {
			await deleteUser(id);
			fetchUsersData();
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className="card-container items-center">
			<h2 className="title">Add some users</h2>
			<form className="form" onSubmit={handleCreateUser}>
				<label htmlFor="fullName" className="visuallyHidden">
					Full Name
				</label>
				<input
					type="text"
					id="fullName"
					placeholder="Full name"
					value={newUser.name}
					onChange={(e) =>
						setNewUser({ ...newUser, name: e.target.value })
					}
					aria-required="true"
					aria-label="Full Name"
					required
				/>

				<label htmlFor="email" className="visuallyHidden">
					Email
				</label>
				<input
					type="email"
					id="email"
					placeholder="Email"
					value={newUser.email}
					onChange={handleEmailChange}
					aria-required="true"
					aria-invalid={!!emailError}
					aria-describedby="emailError"
					aria-label="Email Address"
					required
				/>
				<Button type="submit" aria-label="Add User">
					Add User
				</Button>
			</form>

			{editingUser && (
				<div className="form mt-4">
					<label htmlFor="nameEdit" className="visuallyHidden">
						Name
					</label>
					<input
						type="text"
						id="nameEdit"
						value={editingUser.name}
						onChange={(e) =>
							setEditingUser({
								...editingUser,
								name: e.target.value,
							})
						}
					/>
					<label htmlFor="emailEdit" className="visuallyHidden">
						Email
					</label>
					<input
						type="email"
						id="emailEdit"
						value={editingUser.email}
						onChange={(e) =>
							setEditingUser({
								...editingUser,
								email: e.target.value,
							})
						}
					/>
					<div className={styles.userButtons}>
						<button
							className="buttonSecondary"
							onClick={() => setEditingUser(null)}
						>
							Cancel
						</button>
						<button onClick={handleUpdateUser}>Update</button>
					</div>
				</div>
			)}

			<ul className={styles.usersList}>
				{users.map((user) => (
					<li className={styles.userRow} key={user.id}>
						{user.name} - {user.email}
						<div className={styles.userButtons}>
							<button
								className="buttonTransparent"
								onClick={() => setEditingUser(user)}
							>
								<RiEdit2Fill />
							</button>
							<button
								className="buttonTransparent"
								onClick={() => handleDeleteUser(user.id)}
							>
								<RiDeleteBin5Line />
							</button>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
}
