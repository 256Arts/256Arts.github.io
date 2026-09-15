/* Behaviour only — the category rows are rendered at build time by
   _includes/apps-menu.html, so they work (and are crawlable) without this file.
   Pointer devices open a row by hovering its category; touch and keyboard fall
   back to the native <details> toggle. Leaving the nav returns to the row for
   the page you are on. Also closes on outside click and Escape. */

const menus = [...document.querySelectorAll(".nav-menu")];

if (menus.length) {
    const hoverable = matchMedia("(hover: hover)");
    const current = menus.find((menu) => menu.classList.contains("selected"));
    const closeAll = () => menus.forEach((menu) => (menu.open = false));
    // The page's own category is the resting state, not "everything closed".
    const rest = () => menus.forEach((menu) => (menu.open = menu === current));
    let restTimer;

    menus.forEach((menu) => {
        menu.addEventListener("pointerenter", (event) => {
            if (!hoverable.matches || event.pointerType === "touch") return;
            clearTimeout(restTimer);
            menu.open = true;
        });
        menu.addEventListener("pointerleave", () => {
            if (!hoverable.matches) return;
            clearTimeout(restTimer);
            restTimer = setTimeout(rest, 160);
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

    // Dismissing on purpose closes everything, including the page's own row.
    const dismiss = () => {
        clearTimeout(restTimer);
        closeAll();
    };
    document.addEventListener("click", (event) => {
        if (!event.target.closest(".nav-menu")) dismiss();
    });
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") dismiss();
    });
}
