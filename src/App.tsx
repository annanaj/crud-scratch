import React from 'react';

import EmailForm from './components/EmailForm/EmailForm';
import Player from './components/Player/Player';
import UsersList from './components/UsersList/UsersList';
import ShopItem from './components/ShopItem/ShopItem';

import './index.css';
import RepositoriesList from '@/components/RepositoriesList/RepositoriesList';

export default function App() {
	return (
		<>
			<h1 className="title spacingTop font-black">Sandbox</h1>
			<div className="mainContainer">
				<UsersList />
				<EmailForm />
				<Player />
				<ShopItem />
				<RepositoriesList
					owners={['bradfrost', 'csswizardry', 'gaearon', 'LeaVerou']}
				/>
			</div>
		</>
	);
}
