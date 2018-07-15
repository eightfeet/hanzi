import { UI } from "~/config.js";

export default function getRem(data) {
	const docEl = window.document.documentElement,
		clientWidth = docEl.clientWidth;
	if (!clientWidth) return;
	const largeSize = clientWidth >= UI.width ? true : false;
	const fontSize = largeSize ? UI.baseonFontsize : clientWidth / 24;
	return `${parseInt(data, 0)/fontSize/2}rem`;
}


