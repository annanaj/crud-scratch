import React from 'react';

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';

import SuperMario from '../svg/SuperMario';
import { Button } from '@/components/ui/button';

export default function ShopItem() {
	return (
		<Card>
			<CardHeader>
				<div className="rounded-lg overflow-hidden mb-4">
					<SuperMario />
				</div>
				<CardTitle className="title title-left">
					Switch Super Mario Bros. Wonder
				</CardTitle>
			</CardHeader>
			<CardContent>
				<p>Step into the world of wonders in Super Mario Bros.</p>
			</CardContent>
			<CardFooter className="justify-center">
				<Button aria-label="Buy this game">Buy this game</Button>
			</CardFooter>
		</Card>
	);
}
