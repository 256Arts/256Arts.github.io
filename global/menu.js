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
    // A row only reads as "already under the nav" when it sits at the top of the
    // window: a pinned row always does, the page's own row only before you scroll.
    const underNav = (row, pinned) => !!row && (pinned || scrollY < 1);
    // A row you open from the nav is pinned to the window; the page's own row is
    // part of the page, so it scrolls away. A closing row keeps whichever it was,
    // so it slides out from where it sits — off screen either way once closed.
    // The slide is for a band arriving at (or leaving) the top edge; going from
    // one category to another swaps the contents of the band already there.
    const show = (row, pinned) => {
        const showing = rows.find((other) => other.classList.contains("open"));
        const swap = showing && showing !== row &&
            underNav(showing, showing.classList.contains("pinned")) && underNav(row, pinned);
        if (swap) [showing, row].forEach((other) => other.classList.add("no-slide"));
        rows.forEach((other) => {
            other.classList.toggle("open", other === row);
            if (other === row) other.classList.toggle("pinned", pinned);
        });
        if (!swap) return;
        // Flush the swapped-in styles before transitions come back, so re-enabling
        // them does not animate the change that just happened.
        void document.body.offsetWidth;
        [showing, row].forEach((other) => other.classList.remove("no-slide"));
    };
    let restTimer;

    const hold = (row) => {
        clearTimeout(restTimer);
        show(row, true);
    };
    const rest = () => {
        clearTimeout(restTimer);
        show(current, false);
    };
    const release = () => {
        clearTimeout(restTimer);
        restTimer = setTimeout(rest, 160);
    };

    tabs.forEach((tab) => {
        const row = document.getElementById(tab.getAttribute("aria-controls"));
        tab.addEventListener("pointerenter", (event) => {
            if (!hoverable.matches || event.pointerType === "touch") return;
            hold(row);
        });
        tab.addEventListener("pointerleave", () => hoverable.matches && release());
        tab.addEventListener("focus", () => hold(row));
        row.addEventListener("pointerenter", () => hold(row));
        row.addEventListener("pointerleave", () => release());
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") rest();
    });
}
