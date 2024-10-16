import React from 'react';
import Lottie, { Action } from 'lottie-react';
import checkmark from './checkmark.json';
import hamburger from './hamburger.json';

interface Interactivity {
	mode: 'scroll' | 'cursor';
	actions: Action[];
}

const interactivity: Interactivity = {
	mode: 'cursor',
	actions: [
		{
			position: { x: [0, 1], y: [0, 1] },
			type: 'seek',
			frames: [0, 180],
		},
	],
};

export default function Animations() {
	return (
		<div className="card-container items-center">
			<h2 className="title">Lottie pre/made</h2>
			<div className="flex gap-3 items-center">
				<Lottie
					animationData={checkmark}
					loop={true} // default is true
					autoplay={true} // default is true
					className="w-10 h-10"
				/>
				<Lottie
					animationData={hamburger}
					loop={false}
					autoplay={false}
					interactivity={interactivity} // need to create type for it
					className="w-16 h-16"
				/>
			</div>
			<h2 className="title">Rive creations</h2>
		</div>
	);
}
