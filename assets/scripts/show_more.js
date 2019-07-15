var social_media = document.getElementsByClassName('social-media')[0];
var shown = false;
var toggle_icon = document.getElementsByClassName('toggle-icon')[0];
var btn_label = document.getElementsByClassName('btn-label')[0];

function toggleSocialMedia() {
	if (shown) {
		social_media.style.display = "none";
		toggle_icon.classList.remove("fa-chevron-up");
		toggle_icon.classList.add("fa-chevron-down");
		btn_label.innerHTML = 'View ';
		shown = false;
	} else {
		social_media.style.display = "initial";
		toggle_icon.classList.remove("fa-chevron-down");
		toggle_icon.classList.add("fa-chevron-up");
		btn_label.innerHTML = 'Hide ';
		shown = true;
	}
}