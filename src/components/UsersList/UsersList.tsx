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
	const [nameError, setNameError] = useState('');
	const [emailError, setEmailError] = useState('');
	const [editingUser, setEditingUser] = useState<UsersList | null>(null);
	const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;

	const fetchUsersData = async () => {
		try {
			const response = await fetchUsers();
			setUsers(response.data);
		} catch (error) {
			console.error(error);
		}
	};

	const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newValue = e.target.value;
		if (newValue.length < 3) {
			setNameError('Name must be at least 3 characters long.');
		} else if (newValue.length > 20) {
			setNameError('Name must be less than 20 characters.');
		} else {
			setNameError('');
			// Check if editingUser is not null before updating
			if (editingUser) {
				setEditingUser({
					...editingUser,
					name: newValue,
				});
			}
		}
	};

	const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newValue = e.target.value;
		if (!emailRegex.test(newValue)) {
			setEmailError('Please enter a valid email address.');
		} else {
			setEmailError('');
			// Check if editingUser is not null before updating
			if (editingUser) {
				setEditingUser({
					...editingUser,
					email: newValue,
				});
			}
		}
	};

	const handleCreateUser = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			await createUser(newUser);
			fetchUsersData();
			setNewUser({ name: '', email: '' });
			setNameError('');
			setEmailError('');
		} catch (error) {
			console.error(error);
		}
	};

	const handleUpdateUser = async () => {
		if (editingUser) {
			if (!editingUser.name || editingUser.name.trim().length < 3) {
				setNameError('Name must be at least 3 characters long.');
				return;
			} else if (editingUser.name.length > 20) {
				setNameError('Name must be less than 20 characters.');
				return;
			} else {
				setNameError('');
			}

			if (!editingUser.email || !emailRegex.test(editingUser.email)) {
				setEmailError('Please enter a valid email address.');
				return;
			} else {
				setEmailError('');
			}

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

	useEffect(() => {
		fetchUsersData();
	}, []);

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
					minLength={3}
					maxLength={20}
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
					onChange={(e) =>
						setNewUser({ ...newUser, email: e.target.value })
					}
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
						placeholder="Full name"
						value={editingUser.name}
						onChange={handleNameChange}
						aria-required="true"
						aria-label="Full Name"
					/>
					{nameError && <p className="error">{nameError}</p>}

					<label htmlFor="emailEdit" className="visuallyHidden">
						Email
					</label>
					<input
						type="email"
						id="emailEdit"
						placeholder="Email"
						value={editingUser.email}
						onChange={handleEmailChange}
						aria-required="true"
						aria-invalid={!!emailError}
						aria-describedby="emailError"
						aria-label="Email Address"
					/>
					{emailError && <p className="erro">{emailError}</p>}

					<div className={styles.userButtons}>
						<button
							className="buttonSecondary"
							onClick={() => {
								setEditingUser(null);
								setNameError('');
								setEmailError('');
							}}
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
						<span className={styles.userInfo}>
							{user.name} - {user.email}
						</span>
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
