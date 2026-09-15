/* Behaviour only — the category menus are rendered at build time by
   _includes/apps-menu.html, so they work (and are crawlable) without this file.
   This adds click-outside, Escape to close, and (for browsers without exclusive
   <details name>) closes the other menus when one opens. */

const menus = [...document.querySelectorAll(".nav-menu")];

if (menus.length) {
    const closeAll = () => menus.forEach((menu) => menu.removeAttribute("open"));

    menus.forEach((menu) => {
        menu.addEventListener("toggle", () => {
            if (!menu.open) {
                if (!menus.some((other) => other.open)) document.querySelector(".nav-scrim")?.remove();
                return;
            }
            menus.forEach((other) => other !== menu && other.removeAttribute("open"));
            if (document.querySelector(".nav-scrim")) return;
            const scrim = document.createElement("div");
            scrim.className = "nav-scrim";
            scrim.addEventListener("click", closeAll);
            document.body.append(scrim);
        });
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") closeAll();
    });
}
