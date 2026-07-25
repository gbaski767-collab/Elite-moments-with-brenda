/* =====================================
   Elite Moments - Main JavaScript
===================================== */

import { supabase } from "./supabaseClient.js";

console.log("Supabase Connected");

console.log(supabase);

document.addEventListener("DOMContentLoaded", () => {

    /* ----------------------------
       Mobile Navigation
    ----------------------------- */

    const hamburger = document.querySelector(".hamburger");
    const drawer = document.querySelector(".mobile-drawer");
    const overlay = document.querySelector(".drawer-overlay");

    if (hamburger && drawer && overlay) {

        hamburger.addEventListener("click", () => {

            drawer.classList.toggle("active");
            overlay.classList.toggle("active");

            const expanded =
                hamburger.getAttribute("aria-expanded") === "true";

            hamburger.setAttribute("aria-expanded", !expanded);

        });

        overlay.addEventListener("click", () => {

            drawer.classList.remove("active");
            overlay.classList.remove("active");
            hamburger.setAttribute("aria-expanded", "false");

        });

        document.querySelectorAll(".mobile-drawer a").forEach(link => {

            link.addEventListener("click", () => {

                drawer.classList.remove("active");
                overlay.classList.remove("active");
                hamburger.setAttribute("aria-expanded", "false");

            });

        });

    }

    /* ----------------------------
       FAQ Accordion
    ----------------------------- */

    document.querySelectorAll(".faq-question").forEach(button => {

        button.addEventListener("click", () => {

            const item = button.parentElement;

            item.classList.toggle("active");

        });

    });

    /* ----------------------------
       Active Navigation Link
    ----------------------------- */

    const page = location.pathname.split("/").pop();

    document.querySelectorAll(".nav-menu a").forEach(link => {

        if (link.getAttribute("href") === page) {

            link.style.color = "#c9a14a";

        }

    });

    /* ----------------------------
       Contact Form
    ----------------------------- */

    const contactForm = document.getElementById("contactForm");

    if (contactForm) {

        contactForm.addEventListener("submit", e => {

            e.preventDefault();

            alert(
                "Thank you for your message. Brenda will respond discreetly as soon as possible."
            );

            contactForm.reset();

        });

    }

    /* ----------------------------
       Booking Form
    ----------------------------- */

    const bookingForm = document.getElementById("bookingForm");

    if (bookingForm) {

        bookingForm.addEventListener("submit", e => {

            e.preventDefault();

            alert(
                "Your booking request has been received. Brenda will contact you shortly to confirm availability."
            );

            bookingForm.reset();

        });

    }

    /* ----------------------------
       Fade In On Scroll
    ----------------------------- */

    const observer = new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("fade-in-up");

            }

        });

    }, {
        threshold: 0.2
    });

    document.querySelectorAll("section").forEach(section => {

        observer.observe(section);

    });

    /* ----------------------------
       Scroll To Top Button
    ----------------------------- */

    const topBtn = document.createElement("button");

    topBtn.innerHTML = "↑";

    topBtn.className = "scroll-top";

    document.body.appendChild(topBtn);

    Object.assign(topBtn.style, {
        position: "fixed",
        right: "20px",
        bottom: "20px",
        width: "50px",
        height: "50px",
        borderRadius: "50%",
        border: "none",
        background: "#c9a14a",
        color: "#fff",
        fontSize: "22px",
        cursor: "pointer",
        display: "none",
        zIndex: "999"
    });

    window.addEventListener("scroll", () => {

        if (window.scrollY > 500) {

            topBtn.style.display = "block";

        } else {

            topBtn.style.display = "none";

        }

    });

    topBtn.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

    /* ----------------------------
       Smooth Scroll
    ----------------------------- */

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {

        anchor.addEventListener("click", function (e) {

            const target = document.querySelector(this.getAttribute("href"));

            if (!target) return;

            e.preventDefault();

            target.scrollIntoView({
                behavior: "smooth"
            });

        });

    });

});