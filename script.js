// ================= FILTER GALLERY =================

function filterArt(category, event) {

    const cards =
        document.querySelectorAll('.art-card');

    const buttons =
        document.querySelectorAll('.filters button');

    // ================= ACTIVE BUTTON =================

    buttons.forEach(button => {

        button.classList.remove('active');
    });

    if (event) {

        event.target.classList.add('active');
    }

    // ================= FILTER ANIMATION =================

    cards.forEach(card => {

        card.style.transition =
            "all 0.4s ease";

        if (
            category === 'all' ||
            card.classList.contains(category)
        ) {

            card.style.display = "block";

            setTimeout(() => {

                card.style.opacity = "1";

                card.style.transform =
                    "scale(1)";

            }, 100);

        } else {

            card.style.opacity = "0";

            card.style.transform =
                "scale(0.8)";

            setTimeout(() => {

                card.style.display = "none";

            }, 300);
        }
    });
}

// ================= AOS INITIALIZATION =================

AOS.init({

    duration: 1000,

    once: true
});

// ================= HEADER SHADOW ON SCROLL =================

const header =
    document.querySelector("header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {

        header.style.boxShadow =
            "0 6px 20px rgba(0,0,0,0.15)";

        header.style.background =
            "rgba(255,255,255,0.35)";

    } else {

        header.style.boxShadow =
            "0 4px 20px rgba(0,0,0,0.08)";

        header.style.background =
            "rgba(255,255,255,0.2)";
    }
});

// ================= HERO FADE EFFECT =================

window.addEventListener("scroll", () => {

    const heroContent =
        document.querySelector(".parallax .parallax-content");

    let scrollValue = window.scrollY;

    if (heroContent) {

        heroContent.style.opacity =
            1 - scrollValue / 700;

        heroContent.style.transform =
            `translateY(${scrollValue * 0.2}px)`;
    }
});

// ================= SECRET ADMIN BUTTON =================

const adminBtn =
    document.getElementById("adminBtn");

const adminPanel =
    document.getElementById("adminPanel");

// Show / Hide Admin Button

document.addEventListener("keydown", (e) => {

    if (
        e.altKey &&
        e.shiftKey &&
        e.key.toLowerCase() === "a"
    ) {

        if (
            adminBtn.style.display === "none" ||
            adminBtn.style.display === ""
        ) {

            adminBtn.style.display = "block";

        } else {

            adminBtn.style.display = "none";

            adminPanel.style.display = "none";
        }
    }
});

// ================= OPEN ADMIN PANEL =================

adminBtn.addEventListener("click", () => {

    adminPanel.style.display = "flex";
});

// ================= CLOSE ADMIN PANEL =================

function closePanel() {

    adminPanel.style.display = "none";
}

// ================= ADD ARTWORK =================

function addArtwork() {

    const title =
        document.getElementById("artTitle").value;

    const category =
        document.getElementById("artCategory").value;

    const fileInput =
        document.getElementById("artFile");

    const gallery =
        document.querySelector(".gallery");

    const file =
        fileInput.files[0];

    if (
        !title ||
        !category ||
        !file
    ) {

        alert("Please fill all fields");

        return;
    }

    // ================= CREATE IMAGE URL =================

    const imageURL =
        URL.createObjectURL(file);

    // ================= CREATE CARD =================

    const card =
        document.createElement("div");

    card.className =
        `art-card ${category}`;

    card.setAttribute(
        "data-aos",
        "zoom-in"
    );

    card.innerHTML = `

        <a href="${imageURL}"
           data-lightbox="${category}"
           data-title="${title}">

            <img src="${imageURL}"
                 alt="${title}" />

        </a>
    `;

    // ================= ADD TO GALLERY =================

    gallery.appendChild(card);

    // ================= REFRESH AOS =================

    AOS.refresh();

    // ================= CLEAR FIELDS =================

    document.getElementById("artTitle").value = "";

    document.getElementById("artCategory").value = "";

    document.getElementById("artFile").value = "";

    // ================= CLOSE PANEL =================

    adminPanel.style.display = "none";
}