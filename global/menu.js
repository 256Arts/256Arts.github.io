/* Behaviour only — the Apps menu itself is rendered at build time by
   _includes/apps-menu.html, so it works (and is crawlable) without this file.
   This just adds click-outside and Escape to close. */

const menu = document.querySelector(".nav-menu");

if (menu) {
    const close = () => menu.removeAttribute("open");

    menu.addEventListener("toggle", () => {
        if (!menu.open) {
            document.querySelector(".nav-scrim")?.remove();
            return;
        }
        const scrim = document.createElement("div");
        scrim.className = "nav-scrim";
        scrim.addEventListener("click", close);
        document.body.append(scrim);
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") close();
    });
}
