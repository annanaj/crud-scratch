import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import UsersList from '../components/UsersList/UsersList';
import '@testing-library/jest-dom';

// Mock the fetchUsers API call
vi.mock('../../services/api', () => ({
	fetchUsers: vi.fn().mockResolvedValue({ data: [] }),
}));

describe('UsersList Component', () => {
	it('renders the form inputs and Add User button', () => {
		render(<UsersList />);

		// Check for form elements
		expect(screen.getByPlaceholderText('Full name')).toBeInTheDocument();
		expect(screen.getByPlaceholderText('EmailForm')).toBeInTheDocument();
		expect(
			screen.getByRole('button', { name: /Add User/i })
		).toBeInTheDocument();
	});

	it('handles typing into the name input', () => {
		render(<UsersList />);

		const nameInput = screen.getByPlaceholderText('Full name');

		// Simulate typing a name
		fireEvent.change(nameInput, { target: { value: 'John Doe' } });

		// Check if the input now contains the typed value
		expect(nameInput).toHaveValue('John Doe');
	});
});
