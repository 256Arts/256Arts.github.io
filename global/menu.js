/* Behaviour only — the category menus are rendered at build time by
   _includes/apps-menu.html, so they work (and are crawlable) without this file.
   Pointer devices open a menu by hovering it; touch and keyboard fall back to
   the native <details> toggle. Also closes on outside click and Escape. */

const menus = [...document.querySelectorAll(".nav-menu")];

if (menus.length) {
    const hoverable = matchMedia("(hover: hover)");
    const closeAll = () => menus.forEach((menu) => (menu.open = false));
    let closeTimer;

    menus.forEach((menu) => {
        menu.addEventListener("pointerenter", (event) => {
            if (!hoverable.matches || event.pointerType === "touch") return;
            clearTimeout(closeTimer);
            menu.open = true;
        });
        menu.addEventListener("pointerleave", () => {
            if (!hoverable.matches) return;
            clearTimeout(closeTimer);
            closeTimer = setTimeout(closeAll, 160);
        });
        // Hovering already opened it, so don't let the same gesture close it.
        menu.querySelector("summary").addEventListener("click", (event) => {
            if (hoverable.matches && menu.open) event.preventDefault();
        });
        // Browsers without exclusive <details name> need the others closed.
        menu.addEventListener("toggle", () => {
            if (menu.open) menus.forEach((other) => other !== menu && (other.open = false));
        });
    });

    document.addEventListener("click", (event) => {
        if (!event.target.closest(".nav-menu")) closeAll();
    });
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") closeAll();
    });
}
