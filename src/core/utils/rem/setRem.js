import { UI } from "~/config.js";

(function(doc, win) {
	let docEl = doc.documentElement,
		resizeEvt = "orientationchange" in window ? "orientationchange" : "resize",
		recalc = function() {
			let clientWidth = docEl.clientWidth;
			if (!clientWidth) return;
			if (clientWidth >= UI.width) {
				docEl.style.fontSize = UI.baseonFontsize + "px";
			} else {
				docEl.style.fontSize = UI.baseonFontsize * (clientWidth / UI.width) + "px";
			}
		};

	if (!doc.addEventListener) return;
	win.addEventListener(resizeEvt, recalc, false);
	doc.addEventListener("DOMContentLoaded", recalc, false);
})(document, window);
