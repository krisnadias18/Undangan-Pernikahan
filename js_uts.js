
const menuToggle = document.getElementById("menuToggle");
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");
const closeSidebar = document.getElementById("closeSidebar");
const navLinks = document.querySelectorAll(".nav-menu a");

function openMenu() {
    sidebar.classList.add("open");
    overlay.classList.add("show");
    menuToggle.setAttribute("aria-expanded", "true");
}

function closeMenu() {
    sidebar.classList.remove("open");
    overlay.classList.remove("show");
    menuToggle.setAttribute("aria-expanded", "false");
}

menuToggle.addEventListener("click", () => {
    if (sidebar.classList.contains("open")) {
        closeMenu();
    } else {
        openMenu();
    }
});

closeSidebar.addEventListener("click", closeMenu);
overlay.addEventListener("click", closeMenu);

navLinks.forEach(link => {
    link.addEventListener("click", () => {
        closeMenu();

        navLinks.forEach(item => item.classList.remove("active"));
        link.classList.add("active");
    });
});

const weddingDate = new Date("2026-12-20T08:00:00+07:00").getTime();

function updateCountdown() {
    const now = Date.now();
    const distance = weddingDate - now;

    if (distance <= 0) {
        document.getElementById("countdown").innerHTML =
            "<p>Hari bahagia telah tiba! ♡</p>";
        return;
    }

    document.getElementById("days").textContent =
        Math.floor(distance / (1000 * 60 * 60 * 24));

    document.getElementById("hours").textContent =
        Math.floor((distance / (1000 * 60 * 60)) % 24);

    document.getElementById("minutes").textContent =
        Math.floor((distance / (1000 * 60)) % 60);

    document.getElementById("seconds").textContent =
        Math.floor((distance / 1000) % 60);
}

updateCountdown();

const countdownTimer = setInterval(() => {
    updateCountdown();

    if (Date.now() >= weddingDate) {
        clearInterval(countdownTimer);
    }
}, 1000);

document.getElementById("rsvpForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const nama = document.getElementById("nama").value.trim();
    const kehadiran = document.getElementById("kehadiran").value;
    const ucapan = document.getElementById("ucapan").value.trim();

    if (!nama || !kehadiran || !ucapan) {
        alert("Mohon lengkapi semua data.");
        return;
    }

    const nomorWhatsApp = "6281333740650";

    const pesan =
        "Halo, saya " + nama + ".\n" +
        "Konfirmasi: " + kehadiran + ".\n" +
        "Ucapan: " + ucapan;

    const url =
        "https://wa.me/" + nomorWhatsApp +
        "?text=" + encodeURIComponent(pesan);

    window.open(url, "_blank", "noopener,noreferrer");
});
