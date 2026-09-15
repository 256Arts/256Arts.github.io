/* Behaviour only — the apps rows are rendered at build time by
   _includes/apps-rows.html, and each nav tab is a real link to its first app,
   so the nav works (and is crawlable) without this file. Pointer devices drop a
   category's row down on hover; keyboard users get it when they reach the tab.
   Leaving the nav returns to the row for the page you are on. */

const tabs = [...document.querySelectorAll(".nav-tab")];

if (tabs.length) {
    const hoverable = matchMedia("(hover: hover)");
    const rows = [...document.querySelectorAll(".nav-row")];
    // The page's own category is the resting state, not "everything closed".
    const current = rows.find((row) => row.classList.contains("current"));
    const show = (row) => rows.forEach((other) => other.classList.toggle("open", other === row));
    let restTimer;

    const hold = (row) => {
        clearTimeout(restTimer);
        show(row);
    };
    const release = () => {
        clearTimeout(restTimer);
        restTimer = setTimeout(() => show(current), 160);
    };

    tabs.forEach((tab) => {
        const row = document.getElementById(tab.getAttribute("aria-controls"));
        tab.addEventListener("pointerenter", (event) => {
            if (!hoverable.matches || event.pointerType === "touch") return;
            hold(row);
        });
        tab.addEventListener("pointerleave", () => hoverable.matches && release());
        tab.addEventListener("focus", () => show(row));
        row.addEventListener("pointerenter", () => hold(row));
        row.addEventListener("pointerleave", () => release());
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") hold(current);
    });
}
