import React, { useRef, useState } from 'react';

import { Button } from '@/components/ui/button';

import Audio from '/short_adventure.mp3';
import Video from '/short_video.mp4';

import styles from './Player.module.scss';

export default function Player() {
	const audioRef = useRef<HTMLAudioElement>(null);
	const videoRef = useRef<HTMLVideoElement>(null);
	const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);
	const [isVideoPlaying, setIsVideoPlaying] = useState<boolean>(false);

	const handleAudioPlayPause = () => {
		if (audioRef.current) {
			if (isAudioPlaying) {
				audioRef.current.pause();
			} else {
				audioRef.current.play();
			}
			setIsAudioPlaying(!isAudioPlaying);
		}
	};

	const handleVideoPlayPause = () => {
		if (videoRef.current) {
			if (isVideoPlaying) {
				videoRef.current.pause();
			} else {
				videoRef.current.play();
			}
			setIsVideoPlaying(!isVideoPlaying);
		}
	};

	const handleMouseEnter = () => {
		if (videoRef.current) {
			videoRef.current.controls = true;
		}
	};

	const handleMouseLeave = () => {
		if (videoRef.current) {
			videoRef.current.controls = false;
		}
	};

	return (
		<>
			<div className="card-container items-center">
				<h2 className="title">Listen & watch</h2>
				<audio ref={audioRef} className={styles.media} controls>
					<source src={Audio} type="audio/mpeg" />
					Your browser does not support the audio tag.
				</audio>
				<Button onClick={handleAudioPlayPause}>
					{isAudioPlaying ? 'Pause It' : 'Sound on'}
				</Button>
				<video
					width="auto"
					height="auto"
					autoPlay
					muted
					ref={videoRef}
					className={styles.media}
					onMouseEnter={handleMouseEnter}
					onMouseLeave={handleMouseLeave}
				>
					<source src={Video} type="video/mp4" />
					Your browser does not support the video tag.
				</video>
				<Button onClick={handleVideoPlayPause}>
					{isVideoPlaying ? 'Pause Video' : "Let's play"}
				</Button>
			</div>
		</>
	);
}
