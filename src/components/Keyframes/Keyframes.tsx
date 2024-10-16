import React from 'react';
import { ImSpinner9 } from 'react-icons/im';
import { Button } from '@/components/ui/button';
import Spinner from '../svg/spinner.svg';
import styles from './Keyframes.module.scss';

export default function Keyframes() {
	return (
		<div className="card-container items-center">
			<h2 className="title">Keyframes</h2>
			<div className="flex gap-3 mt-5">
				<div
					className={`${styles.floatingCircle} ${styles.first}`}
				></div>
				<div
					className={`${styles.floatingCircle} ${styles.second}`}
				></div>
				<div
					className={`${styles.floatingCircle} ${styles.third}`}
				></div>
			</div>
			<Button className={styles.button}>Hey there</Button>
			<ImSpinner9 className={styles.spinner} />
			<div className={styles.wheel} aria-labelledby="loading...">
				<Spinner />
			</div>
		</div>
	);
}
