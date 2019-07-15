var social_media = document.getElementsByClassName('social-media')[0];
var shown = false;
var toggle_icon = document.getElementsByClassName('toggle-icon')[0];
var btn_label = document.getElementsByClassName('btn-label')[0];

function toggleSocialMedia() {
	if (shown) {
		social_media.classList.add("hidden");
		toggle_icon.classList.remove("fa-chevron-up");
		toggle_icon.classList.add("fa-chevron-down");
		btn_label.innerHTML = 'View ';
		shown = false;
	} else {
		social_media.classList.remove("hidden");
		toggle_icon.classList.remove("fa-chevron-down");
		toggle_icon.classList.add("fa-chevron-up");
		btn_label.innerHTML = 'Hide ';
		shown = true;
	}
}

window.onload = function(e){ 
	if (window.screen.availWidth < 667) {
	    social_media.classList.add("hidden");
    }
}