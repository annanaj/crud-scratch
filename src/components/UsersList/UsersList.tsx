import React, { useEffect, useState } from 'react';
import { RiDeleteBin5Line, RiEdit2Fill } from 'react-icons/ri';

import styles from './UsersList.module.scss';
import './../../index.scss';

import {
	fetchUsers,
	createUser,
	updateUser,
	deleteUser,
} from '../../services/api';

interface UsersList {
	id: number;
	name: string;
	email: string;
}

export default function UsersList() {
	const [users, setUsers] = useState<UsersList[]>([]);
	const [newUser, setNewUser] = useState({ name: '', email: '' });
	const [emailError, setEmailError] = useState('');
	const [editingUser, setEditingUser] = useState<UsersList | null>(null);
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
				<label htmlFor="fullName" className="visually-hidden">
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
				/>

				<label htmlFor="email" className="visually-hidden">
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
				/>

				{emailError && (
					<p id="emailError" className="error" role="alert">
						{emailError}
					</p>
				)}

				<button
					type="submit"
					onClick={handleCreateUser}
					aria-label="Add User"
				>
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
