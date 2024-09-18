import React, { useEffect, useState } from 'react';
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
	const [editingUser, setEditingUser] = useState<User | null>(null);

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

	const handleCreateUser = async () => {
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
		<div>
			<h1>CRUD Users</h1>

			{/* Form pro přidání nového uživatele */}
			<div>
				<input
					type="text"
					placeholder="Name"
					value={newUser.name}
					onChange={(e) =>
						setNewUser({ ...newUser, name: e.target.value })
					}
				/>
				<input
					type="email"
					placeholder="Email"
					value={newUser.email}
					onChange={(e) =>
						setNewUser({ ...newUser, email: e.target.value })
					}
				/>
				<button onClick={handleCreateUser}>Add User</button>
			</div>

			{/* Form pro editaci uživatele */}
			{editingUser && (
				<div>
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
					<button onClick={handleUpdateUser}>Update User</button>
					<button onClick={() => setEditingUser(null)}>Cancel</button>
				</div>
			)}

			{/* Zobrazení uživatelů */}
			<ul>
				{users.map((user) => (
					<li key={user.id}>
						{user.name} - {user.email}
						<button onClick={() => setEditingUser(user)}>
							Edit
						</button>
						<button onClick={() => handleDeleteUser(user.id)}>
							Delete
						</button>
					</li>
				))}
			</ul>
		</div>
	);
}
