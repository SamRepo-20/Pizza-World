/* =========================================================
   PIZZA WORLD CAFÉ
   Vanilla JavaScript ES6+
   ========================================================= */

"use strict";


/* ================= MOBILE NAVIGATION ================= */

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {

  const isOpen = navLinks.classList.toggle("active");

  menuToggle.setAttribute("aria-expanded", String(isOpen));

});


/*
 * Close the mobile menu after clicking a navigation link.
 */

navLinks.querySelectorAll("a").forEach((link) => {

  link.addEventListener("click", () => {

    navLinks.classList.remove("active");

    menuToggle.setAttribute("aria-expanded", "false");

  });

});


/*
 * Close mobile menu when clicking outside it.
 */

document.addEventListener("click", (event) => {

  const clickedInsideNav =
    navLinks.contains(event.target) ||
    menuToggle.contains(event.target);

  if (!clickedInsideNav) {

    navLinks.classList.remove("active");

    menuToggle.setAttribute("aria-expanded", "false");

  }

});


/* ================= MENU MODAL ================= */

const modal = document.getElementById("itemModal");
const modalBackdrop = document.getElementById("modalBackdrop");
const modalClose = document.getElementById("modalClose");

const modalIcon = document.getElementById("modalIcon");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const modalPrice = document.getElementById("modalPrice");

const menuItems = document.querySelectorAll(
  ".menu-card, .combo-card"
);


/*
 * Opens the item details modal.
 */

function openModal(item) {

  const name =
    item.dataset.name || "Menu Item";

  const price =
    item.dataset.price || "";

  const description =
    item.dataset.description ||
    "A delicious Pizza World Café favorite.";

  const iconElement =
    item.querySelector(".item-icon");

  /*
   * Combo cards don't have an item-icon.
   * Use a pizza emoji for those cards.
   */

  const icon =
    iconElement
      ? iconElement.textContent.trim()
      : "🍕";


  modalIcon.textContent = icon;
  modalTitle.textContent = name;
  modalDescription.textContent = description;
  modalPrice.textContent = price;

  modal.classList.add("active");

  modal.setAttribute("aria-hidden", "false");

  document.body.classList.add("modal-open");

  /*
   * Move keyboard focus to close button
   * for accessibility.
   */

  modalClose.focus();

}


/*
 * Closes the modal.
 */

function closeModal() {

  modal.classList.remove("active");

  modal.setAttribute("aria-hidden", "true");

  document.body.classList.remove("modal-open");

}


/*
 * Add click interaction to every menu item.
 */

menuItems.forEach((item) => {

  item.addEventListener("click", () => {
    openModal(item);
  });

});


/*
 * Close modal using the close button.
 */

modalClose.addEventListener("click", closeModal);


/*
 * Close modal by clicking the backdrop.
 */

modalBackdrop.addEventListener("click", closeModal);


/*
 * Close modal with Escape key.
 */

document.addEventListener("keydown", (event) => {

  if (event.key === "Escape" &&
      modal.classList.contains("active")) {

    closeModal();

  }

});


/* ================= FOOTER YEAR ================= */

const currentYear =
  document.getElementById("currentYear");

currentYear.textContent =
  new Date().getFullYear();


/* ================= ACTIVE NAVIGATION ================= */

/*
 * Highlights the navigation link belonging to
 * the section currently visible on screen.
 */

const sections = document.querySelectorAll(
  "main section[id]"
);

const navigationLinks =
  document.querySelectorAll(".nav-links a");


const sectionObserver =
  new IntersectionObserver(
    (entries) => {

      entries.forEach((entry) => {

        if (!entry.isIntersecting) {
          return;
        }

        navigationLinks.forEach((link) => {

          link.classList.remove("current");

          const target =
            link.getAttribute("href");

          if (target === `#${entry.target.id}`) {

            link.classList.add("current");

          }

        });

      });

    },
    {
      root: null,
      threshold: 0.25
    }
  );


sections.forEach((section) => {
  sectionObserver.observe(section);
});