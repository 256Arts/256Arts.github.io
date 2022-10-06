function preloader() {
	if (document.images) {
		var img1 = new Image();
		var img2 = new Image();
		var img3 = new Image();
		var img4 = new Image();
		var img5 = new Image();
		var darkText = window.matchMedia("(prefers-color-scheme: dark)").matches ? "_dark" : "";
		img1.src = "backdrop_game"+darkText+".jpg";
		img3.src = "backdrop_gym"+darkText+".jpg";
		img5.src = "backdrop_space.jpg";
	}
}
function addLoadEvent(func) {
	var oldonload = window.onload;
	if (typeof window.onload != 'function') {
		window.onload = func;
	} else {
		window.onload = function() {
			if (oldonload) {
				oldonload();
			}
			func();
		}
	}
}
addLoadEvent(preloader);

document.getElementById("apps").onscroll = function() {devBG()};
function devBG() {
	var appsWidth = document.getElementById("apps").scrollWidth;
	var darkText = window.matchMedia("(prefers-color-scheme: dark)").matches ? "_dark" : "";
    if (document.getElementById("apps").scrollLeft < 0.08 * appsWidth) {
        document.getElementById("developer").style.background = 'url("backdrop_game'+darkText+'.jpg") no-repeat center center';
    } else if (document.getElementById("apps").scrollLeft < 0.5 * appsWidth) {
    	document.getElementById("developer").style.background = 'url("backdrop_gym'+darkText+'.jpg") no-repeat center center';
    } else {
		document.getElementById("developer").style.background = 'url("backdrop_space.jpg") no-repeat center center';
	}
    document.getElementById("developer").style.backgroundSize = "cover";
}