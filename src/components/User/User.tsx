import React, { useEffect, useState } from 'react';
import { RiDeleteBin5Line, RiEdit2Fill } from 'react-icons/ri';

import styles from './User.module.scss';
import './../../index.scss';

import {
	fetchUsers,
	createUser,
	updateUser,
	deleteUser,
} from '../../services/api';

interface User {
	id: number;
	name: string;
	email: string;
}

export default function User() {
	const [users, setUsers] = useState<User[]>([]);
	const [newUser, setNewUser] = useState({ name: '', email: '' });
	const [emailError, setEmailError] = useState('');
	const [editingUser, setEditingUser] = useState<User | null>(null);
	const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;

	const handleEmailChange = (e: { target: { value: any } }) => {
		setNewUser({ ...newUser, email: e.target.value });
		// Clear the error if the user starts typing again
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

	const handleCreateUser = async (e: { preventDefault: () => void }) => {
		e.preventDefault();

		if (!emailRegex.test(newUser.email)) {
			setEmailError('Invalid email');
			return;
		}

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
		<div className={styles.root}>
			<h1 className={styles.title}>Users list</h1>

			<div className={styles.form}>
				<input
					type="text"
					placeholder="Full name"
					value={newUser.name}
					onChange={(e) =>
						setNewUser({ ...newUser, name: e.target.value })
					}
				/>
				<input
					type="email"
					placeholder="Email"
					value={newUser.email}
					onChange={handleEmailChange}
				/>
				{emailError && <p className="error">{emailError}</p>}
				<button type="submit" onClick={handleCreateUser}>
					Add User
				</button>
			</div>

			{editingUser && (
				<div className={styles.form}>
					<input
						type="text"
						value={editingUser.name}
						onChange={(e) =>
							setEditingUser({
								...editingUser,
								name: e.target.value,
							})
						}
					/>
					<input
						type="email"
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

			<ul>
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
