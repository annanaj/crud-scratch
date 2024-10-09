import React from 'react';
import SuperMario from '../svg/supermario.svg';
import HomeIcon from '../svg/home.svg';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function ShopItem() {
	return (
		<Card>
			<CardHeader>
				<div className="rounded-lg overflow-hidden mb-4">
					<SuperMario />
				</div>
				<CardTitle className="title title-left flex gap-2">
					<HomeIcon />
					Switch Super Mario Bros.
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
