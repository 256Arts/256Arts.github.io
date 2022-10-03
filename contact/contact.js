var mailto = "";
var body = "";

function updateBody() {
	let name = encodeURI($("#name").val());
	let message = encodeURI($("#message").val());
	body = "?body=" + message + "%0D%0A %0D%0A" + name;
	updateLink();
}

function gRecaptchaTrue() {
	let to = "cots.smith0a";
	mailto = "mailto:" + to + "@";
	updateLink();
}

function gRecaptchaFalse() {
	mailto = "";
	updateLink();
}

function updateLink() {
	let domain = "icloud.com";
	if (mailto != "") {
		$("#review-message").attr("href", mailto + domain + body).attr("onclick", "send()").removeClass("disabled");
	} else {
		$("#review-message").attr("href", "").attr("onclick", "").addClass("disabled");
	}
}

function send() {
	$(".contact-form").after('<div class="message-bubble">' + $("#message").val() + '</div>').hide();
}