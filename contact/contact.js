const form = document.querySelector(".contact-form");
const submit = form.querySelector("button[type=submit]");
const status = form.querySelector(".form-status");

function turnstileReady() {
	submit.disabled = false;
}

function turnstileExpired() {
	submit.disabled = true;
}

form.addEventListener("submit", async (event) => {
	event.preventDefault();
	submit.disabled = true;
	status.textContent = "Sending…";

	try {
		const response = await fetch(form.action, { method: "POST", body: new FormData(form) });
		const result = await response.json();
		if (!response.ok) throw new Error(result.error);

		const bubble = document.createElement("div");
		bubble.className = "message-bubble";
		bubble.textContent = form.message.value;
		const note = document.createElement("p");
		note.className = "secondary";
		note.textContent = `Sent. We'll reply to ${form.email.value}.`;
		form.replaceWith(bubble, note);
	} catch (error) {
		status.textContent = error.message || "Couldn't send right now. Please try again later.";
		turnstile.reset();
	}
});
