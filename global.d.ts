declare module '*.jpg';
declare module '*.json';
declare module '*.module.css';
declare module '*.module.scss';
declare module '*.mp4' {
	const src: string;
	// @ts-ignore
	export default src;
}
declare module '*.mp3' {
	const src: string;
	// @ts-ignore
	export default src;
}
