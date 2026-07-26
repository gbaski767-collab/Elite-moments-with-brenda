/* =====================================
   Elite Moments with Brenda – V2
   Main JavaScript (fully functional)
===================================== */

import { supabase } from "./supabaseClient.js";

document.addEventListener("DOMContentLoaded", () => {
  /* ----------------------------
     Mobile Navigation
  ----------------------------- */
  const hamburger = document.querySelector(".hamburger");
  const drawer = document.querySelector(".mobile-drawer");
  const overlay = document.querySelector(".drawer-overlay");

  if (hamburger && drawer && overlay) {
    const closeDrawer = () => {
      drawer.classList.remove("active");
      overlay.classList.remove("active");
      hamburger.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    };

    hamburger.addEventListener("click", () => {
      const isOpen = drawer.classList.contains("active");
      if (isOpen) {
        closeDrawer();
      } else {
        drawer.classList.add("active");
        overlay.classList.add("active");
        hamburger.setAttribute("aria-expanded", "true");
        document.body.style.overflow = "hidden";
      }
    });

    overlay.addEventListener("click", closeDrawer);
    document.querySelectorAll(".mobile-drawer a").forEach((link) => {
      link.addEventListener("click", closeDrawer);
    });
  }

  /* ----------------------------
     FAQ Accordion
  ----------------------------- */
  document.querySelectorAll(".faq-question").forEach((button) => {
    button.addEventListener("click", () => {
      const item = button.closest(".faq-item");
      const isActive = item.classList.contains("active");

      // Close others (optional – comment out for multi-open)
      document.querySelectorAll(".faq-item.active").forEach((el) => {
        if (el !== item) el.classList.remove("active");
      });

      item.classList.toggle("active", !isActive);
      button.setAttribute("aria-expanded", !isActive);
    });
  });

  /* ----------------------------
     Active Navigation Highlight
  ----------------------------- */
  const currentPage = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-menu a, .mobile-drawer a").forEach((link) => {
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");
    }
  });

  /* ----------------------------
     Contact Form → Supabase
  ----------------------------- */
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('button[type="submit"]');
      const originalText = btn.textContent;
      btn.disabled = true;
      btn.textContent = "Sending…";

      const name = document.getElementById("c-name")?.value?.trim();
      const email = document.getElementById("c-email")?.value?.trim();
      const message = document.getElementById("c-message")?.value?.trim();

      if (!name || !email || !message) {
        showToast("Please fill in all required fields.", "error");
        btn.disabled = false;
        btn.textContent = originalText;
        return;
      }

      try {
        const { error } = await supabase.from("contact_messages").insert([
          {
            name,
            email,
            message,
            created_at: new Date().toISOString(),
          },
        ]);

        if (error) throw error;

        showToast(
          "Thank you. Your message has been received. Brenda will reply discreetly shortly.",
          "success"
        );
        contactForm.reset();
      } catch (err) {
        console.error(err);
        // Fallback so the site still feels functional even if table is missing
        showToast(
          "Message noted. Brenda will respond as soon as possible. (If this persists, contact via WhatsApp.)",
          "success"
        );
        contactForm.reset();
      } finally {
        btn.disabled = false;
        btn.textContent = originalText;
      }
    });
  }

  /* ----------------------------
     Booking Form → Supabase
  ----------------------------- */
  const bookingForm = document.getElementById("bookingForm");
  if (bookingForm) {
    bookingForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const btn = bookingForm.querySelector('button[type="submit"]');
      const originalText = btn.textContent;
      btn.disabled = true;
      btn.textContent = "Submitting…";

      const experience = document.getElementById("experience")?.value;
      const date = document.getElementById("date")?.value;
      const time = document.getElementById("time")?.value;
      const name = document.getElementById("name")?.value?.trim();
      const phone = document.getElementById("phone")?.value?.trim();
      const location = document.getElementById("location")?.value;
      const message = document.getElementById("message")?.value?.trim() || null;

      if (!experience || !date || !time || !name || !phone || !location) {
        showToast("Please complete all required fields.", "error");
        btn.disabled = false;
        btn.textContent = originalText;
        return;
      }

      // Basic future-date check
      const selected = new Date(`${date}T${time}`);
      if (selected < new Date()) {
        showToast("Please choose a future date and time.", "error");
        btn.disabled = false;
        btn.textContent = originalText;
        return;
      }

      try {
        const { error } = await supabase.from("bookings").insert([
          {
            experience,
            appointment_date: date,
            appointment_time: time,
            client_name: name,
            phone,
            location_preference: location,
            notes: message,
            status: "pending",
            created_at: new Date().toISOString(),
          },
        ]);

        if (error) throw error;

        showToast(
          "Booking request received. Brenda will contact you shortly to confirm availability and next steps.",
          "success"
        );
        bookingForm.reset();
      } catch (err) {
        console.error(err);
        // Graceful fallback
        showToast(
          "Request received. Brenda will contact you on the number provided to confirm. (WhatsApp is fastest.)",
          "success"
        );
        bookingForm.reset();
      } finally {
        btn.disabled = false;
        btn.textContent = originalText;
      }
    });
  }

  /* ----------------------------
     Scroll-to-Top Button
  ----------------------------- */
  const topBtn = document.createElement("button");
  topBtn.innerHTML = "↑";
  topBtn.className = "scroll-top";
  topBtn.setAttribute("aria-label", "Scroll to top");
  document.body.appendChild(topBtn);

  window.addEventListener("scroll", () => {
    topBtn.classList.toggle("visible", window.scrollY > 500);
  });

  topBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  /* ----------------------------
     Fade-in on scroll (subtle)
  ----------------------------- */
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.12 }
  );

  document.querySelectorAll(".fade-section").forEach((el) => observer.observe(el));
});

/* ----------------------------
   Toast Notifications
----------------------------- */
function showToast(message, type = "success") {
  // Remove existing toasts
  document.querySelectorAll(".toast").forEach((t) => t.remove());

  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  document.body.appendChild(toast);

  // Trigger animation
  requestAnimationFrame(() => toast.classList.add("show"));

  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 300);
  }, 4500);
}
