
/* =========================
   ORIGINAL VALENTINE TEMPLATE
========================= */

const intro = document.getElementById("intro");
const number = document.getElementById("number");
const main = document.getElementById("main");
const navBar = document.querySelector(".top-nav");
const giftArea = document.getElementById("giftArea");
const giftBox = document.getElementById("giftBox");
const giftText = document.getElementById("giftText");
const message = document.getElementById("message");
const music = document.getElementById("birthdayMusic");
const heartLayer = document.getElementById("heartLayer");

let count = 5;
let giftOpened = false;
let heartsInterval = null;


/* =========================
   COUNTDOWN
========================= */

const countdown = setInterval(() => {
    count--;

    if (count > 0) {
        number.innerText = count;

        number.style.animation = "none";
        void number.offsetWidth;
        number.style.animation = "numberIn .8s ease";
    } else {
        clearInterval(countdown);

        number.innerText = "♡";

        number.style.animation = "none";
        void number.offsetWidth;
        number.style.animation = "numberIn .8s ease";

        setTimeout(() => {
            intro.classList.add("hide");
            main.classList.add("show");

            // إظهار الناف بار بعد انتهاء العد التنازلي
            if (navBar) {
                navBar.classList.add("show-nav");
            }

            // إخفاء شاشة العد التنازلي بعد انتهاء الانتقال
            setTimeout(() => {
                intro.style.display = "none";
            }, 1300);

            startHearts();
        }, 700);
    }
}, 1000);


/* =========================
   ORDER SYSTEM ELEMENTS
========================= */

const LANGUAGE_KEY = "4u-language";
const ORDER_REFERENCE_KEY = "4u-valentine-order-reference";
const WHATSAPP_NUMBER = "201040275280";

const aboutButton = document.getElementById("aboutButton");
const aboutModal = document.getElementById("aboutModal");
const closeModalButton = document.getElementById("closeModal");

const headerOrder = document.getElementById("headerOrder");
const modalOrderButton = document.getElementById("modalOrderButton");

const customizationSection = document.getElementById("customizationSection");

const orderReference = document.getElementById("orderReference");
const recipientName = document.getElementById("recipientName");
const senderName = document.getElementById("senderName");
const birthdayDate = document.getElementById("birthdayDate");
const personalMessage = document.getElementById("personalMessage");
const customizationDetails = document.getElementById("customizationDetails");

const copyOrderDetailsButton = document.getElementById("copyOrderDetails");
const sendOrderWhatsAppButton = document.getElementById("sendOrderWhatsApp");
const copyStatus = document.getElementById("copyStatus");


/* =========================
   OPEN GIFT
========================= */

function openGift() {
    if (giftOpened) return;

    giftOpened = true;

    if (music) {
        music.volume = 0.7;
        music.play().catch(() => {});
    }

    giftArea.classList.add("open");
    giftBox.style.pointerEvents = "none";

    setTimeout(() => {
        giftBox.style.display = "none";
        giftText.style.display = "none";

        const pageHeading = document.getElementById("pageHeading");
        const subtitle = document.getElementById("subtitle");

        if (pageHeading) {
            pageHeading.style.display = "none";
        }

        if (subtitle) {
            subtitle.style.display = "none";
        }

        message.classList.add("show");

        // إظهار حقول التخصيص بعد فتح الهدية
        if (customizationSection) {
            customizationSection.classList.add("visible");
        }

        // قلوب احتفالية
        for (let i = 0; i < 70; i++) {
            setTimeout(createHeart, i * 35);
        }
    }, 1900);
}


/* =========================
   CLICK ON BOX ONLY
========================= */

giftBox.addEventListener("click", openGift);


/* =========================
   KEYBOARD ACCESS
========================= */

giftBox.addEventListener("keydown", function(event) {
    if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openGift();
    }
});


/* =========================
   CREATE FLOATING HEARTS
========================= */

function createHeart() {
    if (!heartLayer) return;

    const heart = document.createElement("div");

    heart.className = "heart";

    const hearts = ["♡", "❤︎", "𝄞", "𝜗𝜚", "⋆"];

    heart.innerText = hearts[
        Math.floor(Math.random() * hearts.length)
    ];

    // القلوب تفضل داخل الطبقة المحددة
    heart.style.left = Math.random() * 96 + "%";
    heart.style.fontSize = (15 + Math.random() * 35) + "px";
    heart.style.animationDuration = (4 + Math.random() * 5) + "s";

    heartLayer.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 9500);
}


/* =========================
   CONTINUOUS HEARTS
========================= */

function startHearts() {
    if (heartsInterval !== null) return;

    heartsInterval = setInterval(createHeart, 650);
}


/* =========================
   LANGUAGE
========================= */

function getCurrentLanguage() {
    return localStorage.getItem(LANGUAGE_KEY) === "en" ? "en" : "ar";
}

function applyPurchaseLanguage() {
    const language = getCurrentLanguage();

    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";

    document.querySelectorAll("[data-ar][data-en]").forEach((element) => {
        const value = element.dataset[language];

        if (value !== undefined) {
            element.textContent = value;
        }
    });

    document.querySelectorAll(
        "[data-placeholder-ar][data-placeholder-en]"
    ).forEach((element) => {
        element.placeholder = language === "ar"
            ? element.dataset.placeholderAr
            : element.dataset.placeholderEn;
    });

    if (copyStatus) {
        copyStatus.textContent = "";
    }
}


/* =========================
   ORDER REFERENCE
========================= */

function getOrCreateOrderReference() {
    let reference = sessionStorage.getItem(ORDER_REFERENCE_KEY);

    if (!reference) {
        reference = "4U-VAL-" +
            Math.random().toString(36).slice(2, 8).toUpperCase();

        sessionStorage.setItem(ORDER_REFERENCE_KEY, reference);
    }

    return reference;
}

if (orderReference) {
    orderReference.textContent = getOrCreateOrderReference();
}

applyPurchaseLanguage();

window.addEventListener("storage", (event) => {
    if (event.key === LANGUAGE_KEY) {
        applyPurchaseLanguage();
    }
});


/* =========================
   ABOUT MODAL
========================= */

function openAboutModal() {
    if (!aboutModal) return;

    aboutModal.classList.add("active");
    aboutModal.setAttribute("aria-hidden", "false");

    if (closeModalButton) {
        closeModalButton.focus();
    }
}

function closeAboutModal() {
    if (!aboutModal) return;

    aboutModal.classList.remove("active");
    aboutModal.setAttribute("aria-hidden", "true");

    if (aboutButton) {
        aboutButton.focus();
    }
}

if (aboutButton) {
    aboutButton.addEventListener("click", openAboutModal);
}

if (closeModalButton) {
    closeModalButton.addEventListener("click", closeAboutModal);
}

if (aboutModal) {
    aboutModal.addEventListener("click", (event) => {
        if (event.target === aboutModal) {
            closeAboutModal();
        }
    });
}

document.addEventListener("keydown", (event) => {
    if (
        event.key === "Escape" &&
        aboutModal &&
        aboutModal.classList.contains("active")
    ) {
        closeAboutModal();
    }
});


/* =========================
   NAVIGATION TO ORDER FORM
========================= */

function goToOrderForm(event) {
    event.preventDefault();

    if (aboutModal) {
        aboutModal.classList.remove("active");
        aboutModal.setAttribute("aria-hidden", "true");
    }

    // الهدية لازم تتفتح الأول عشان تظهر الحقول
    if (!giftOpened) {
        if (giftBox) {
            giftBox.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });
        }

        return;
    }

    if (customizationSection) {
        customizationSection.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }
}

if (headerOrder) {
    headerOrder.addEventListener("click", goToOrderForm);
}

if (modalOrderButton) {
    modalOrderButton.addEventListener("click", goToOrderForm);
}


/* =========================
   PREPARED ORDER MESSAGE
========================= */

function getOrderMessage() {
    const ar = getCurrentLanguage() === "ar";

    const reference = orderReference
        ? orderReference.textContent.trim()
        : "غير متاح";

    const recipient = recipientName ? recipientName.value.trim() : "";
    const sender = senderName ? senderName.value.trim() : "";
    const date = birthdayDate ? birthdayDate.value.trim() : "";
    const personal = personalMessage ? personalMessage.value.trim() : "";
    const details = customizationDetails
        ? customizationDetails.value.trim()
        : "";

    if (ar) {
        return [
            "أهلًا 4U celebrations ❤️",
            "",
            "عايز أطلب نسخة فلانتاين مخصصة من النموذج ده",
            `رقم الطلب المبدئي: ${reference}`,
            "اسم النموذج: قالب فلانتاين",
            `اسم الشخص اللي هقدم له الهدية: ${recipient || "لسه محددتوش"}`,
            `اسمي: ${sender || "لسه محددتوش"}`,
            `التاريخ المميز: ${date || "لم يتم تحديده"}`,
            `رسالتي الخاصة: ${personal || "هحددها بعدين"}`,
            `تفاصيل إضافية: ${details || "لا يوجد"}`,
            "",
            "مستني أعرف السعر والتفاصيل والخطوات الجاية، شكرًا ❤️"
        ].join("\n");
    }

    return [
        "Hi 4U celebrations ❤️",
        "",
        "I'd like to order a personalized Valentine template.",
        `Draft order reference: ${reference}`,
        "Template name: Valentine Template",
        `Recipient's name: ${recipient || "Not decided yet"}`,
        `My name: ${sender || "Not decided yet"}`,
        `Special date: ${date || "Not specified"}`,
        `Personal message: ${personal || "I'll decide later"}`,
        `Extra details: ${details || "None"}`,
        "",
        "Please let me know the price and next steps. Thank you ❤️"
    ].join("\n");
}


/* =========================
   COPY ORDER DETAILS
========================= */

async function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        return;
    }

    const temp = document.createElement("textarea");

    temp.value = text;
    temp.style.position = "fixed";
    temp.style.opacity = "0";

    document.body.appendChild(temp);
    temp.select();

    const copied = document.execCommand("copy");

    temp.remove();

    if (!copied) {
        throw new Error("Copy failed");
    }
}

if (copyOrderDetailsButton) {
    copyOrderDetailsButton.addEventListener("click", async () => {
        try {
            await copyText(getOrderMessage());

            if (copyStatus) {
                copyStatus.textContent = getCurrentLanguage() === "ar"
                    ? "تم نسخ تفاصيل الطلب"
                    : "Order details copied";
            }
        } catch (error) {
            if (copyStatus) {
                copyStatus.textContent = getCurrentLanguage() === "ar"
                    ? "النسخ التلقائي مش متاح. جرّب تفتح الصفحة من المتصفح."
                    : "Copy isn't available here. Try opening the page in your browser.";
            }
        }
    });
}


/* =========================
   SEND ORDER TO WHATSAPP
========================= */

if (sendOrderWhatsAppButton) {
    sendOrderWhatsAppButton.addEventListener("click", () => {
        const url =
            "https://wa.me/" +
            WHATSAPP_NUMBER +
            "?text=" +
            encodeURIComponent(getOrderMessage());

        window.open(url, "_blank", "noopener,noreferrer");
    });
}
