import React, { useState } from 'react';

import { Button } from '@/components/ui/button';

export default function EmailForm() {
	const [email, setEmail] = useState('');
	const [message, setMessage] = useState('');
	const [statusMessage, setStatusMessage] = useState('');

	const sendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			const response = await fetch('http://localhost:5002/send-email', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email, message }),
			});

			if (response.ok) {
				setStatusMessage('Email sent successfully!');
				setEmail('');
				setMessage('');
			} else {
				setStatusMessage('Error while sending the email. Go fix it.');
			}
		} catch (error) {
			console.error('Error:', error);
			setStatusMessage('Error while sending the email. Go fix it.');
		}
	};

	return (
		<div className="card-container items-center">
			<h2 className="title">Sending an email</h2>
			<form onSubmit={sendEmail} className="form">
				<label htmlFor="emailSent" className="visuallyHidden">
					Email
				</label>
				<input
					type="email"
					id="emailSent"
					placeholder="Email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					aria-required="true"
					aria-label="Email Address"
					required
				/>

				<label htmlFor="emailMessage" className="visuallyHidden">
					Email Message
				</label>
				<textarea
					id="emailMessage"
					placeholder="Write the message here"
					value={message}
					onChange={(e) => setMessage(e.target.value)}
					aria-required="true"
					aria-label="Email Message"
					required
				/>
				<Button type="submit" aria-label="Send email">
					Send email
				</Button>
			</form>
			{statusMessage && <p className="success">{statusMessage}</p>}
		</div>
	);
}
