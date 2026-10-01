/* =========================================
   CONFIGURATION
========================================= */

// July 15, 2026
const FIRST_MET_DATE = new Date(2026, 6, 15);

// The actual passcode is July 15, 2026.
const CORRECT_DATE = "2026-07-15";


/* =========================================
   ELEMENTS
========================================= */

const lockScreen = document.getElementById("lockScreen");
const envelopeScreen = document.getElementById("envelopeScreen");
const mainPage = document.getElementById("mainPage");

const passcodeInput = document.getElementById("passcode");
const unlockButton = document.getElementById("unlockButton");
const wrongDate = document.getElementById("wrongDate");

const envelope = document.getElementById("envelope");
const closeLetter = document.getElementById("closeLetter");

const daysTogether = document.getElementById("daysTogether");

const contentPages = document.querySelectorAll(".content-page");
const menuCards = document.querySelectorAll(".menu-card");
const backButtons = document.querySelectorAll(".back-button");

const surpriseButton = document.getElementById("surpriseButton");
const surpriseModal = document.getElementById("surpriseModal");
const closeModal = document.getElementById("closeModal");
const goToSurprise = document.getElementById("goToSurprise");

const lockAgain = document.getElementById("lockAgain");


/* =========================================
   DAY COUNTER
========================================= */

function calculateDaysTogether() {

    const today = new Date();

    // Remove the time component so the calculation is based
    // purely on calendar dates.
    const todayDate = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate()
    );

    const firstDate = new Date(
        FIRST_MET_DATE.getFullYear(),
        FIRST_MET_DATE.getMonth(),
        FIRST_MET_DATE.getDate()
    );

    const difference = todayDate - firstDate;

    const days = Math.floor(
        difference / (1000 * 60 * 60 * 24)
    );

    daysTogether.textContent = Math.max(0, days).toLocaleString();
}


// Calculate immediately
calculateDaysTogether();

// Check once every minute.
// This means the counter automatically updates when midnight passes.
setInterval(calculateDaysTogether, 60000);


/* =========================================
   CHECK IF ALREADY UNLOCKED
========================================= */

function checkSavedUnlock() {

    const unlocked = localStorage.getItem("ourLittleWorldUnlocked");

    if (unlocked === "true") {

        lockScreen.classList.remove("active");

        envelopeScreen.classList.remove("active");

        mainPage.classList.add("show");

    }

}


/* =========================================
   UNLOCK
========================================= */

unlockButton.addEventListener("click", function () {

    const enteredDate = passcodeInput.value;

    if (enteredDate === CORRECT_DATE) {

        wrongDate.classList.remove("show");

        // Remember that the user already unlocked the website.
        localStorage.setItem(
            "ourLittleWorldUnlocked",
            "true"
        );

        lockScreen.classList.remove("active");

        envelopeScreen.classList.add("active");

        // Small delay makes the envelope opening feel natural.
        setTimeout(() => {

            envelope.classList.add("open");

        }, 400);

    } else {

        wrongDate.classList.add("show");

        passcodeInput.classList.add("shake");

        setTimeout(() => {

            passcodeInput.classList.remove("shake");

        }, 500);

    }

});


/* =========================================
   ENTER KEY ON DATE INPUT
========================================= */

passcodeInput.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {

        unlockButton.click();

    }

});


/* =========================================
   CLOSE INTRO LETTER
========================================= */

closeLetter.addEventListener("click", function () {

    envelopeScreen.classList.remove("active");

    mainPage.classList.add("show");

    window.scrollTo(0, 0);

});


/* =========================================
   NAVIGATION
========================================= */

function showSection(sectionName) {

    mainPage.classList.remove("show");

    contentPages.forEach(page => {

        page.classList.remove("active");

    });

    const selectedPage =
        document.getElementById(sectionName + "Section");

    if (selectedPage) {

        selectedPage.classList.add("active");

    }

    window.scrollTo(0, 0);

}


menuCards.forEach(card => {

    card.addEventListener("click", function () {

        const section = this.dataset.section;

        showSection(section);

    });

});


/* =========================================
   BACK BUTTONS
========================================= */

backButtons.forEach(button => {

    button.addEventListener("click", function () {

        contentPages.forEach(page => {

            page.classList.remove("active");

        });

        mainPage.classList.add("show");

        window.scrollTo(0, 0);

    });

});


/* =========================================
   LOVE SLIDES
========================================= */

const loveSlides =
    document.querySelectorAll(".love-slide");

const previousSlide =
    document.getElementById("previousSlide");

const nextSlide =
    document.getElementById("nextSlide");

const slideDots =
    document.getElementById("slideDots");

let currentSlide = 0;


// Create dots
loveSlides.forEach((slide, index) => {

    const dot = document.createElement("span");

    dot.classList.add("slide-dot");

    if (index === 0) {
        dot.classList.add("active");
    }

    dot.addEventListener("click", function () {

        currentSlide = index;

        updateLoveSlide();

    });

    slideDots.appendChild(dot);

});


function updateLoveSlide() {

    loveSlides.forEach((slide, index) => {

        slide.classList.toggle(
            "active",
            index === currentSlide
        );

    });


    const dots =
        document.querySelectorAll(".slide-dot");

    dots.forEach((dot, index) => {

        dot.classList.toggle(
            "active",
            index === currentSlide
        );

    });

}


nextSlide.addEventListener("click", function () {

    currentSlide++;

    if (currentSlide >= loveSlides.length) {

        currentSlide = 0;

    }

    updateLoveSlide();

});


previousSlide.addEventListener("click", function () {

    currentSlide--;

    if (currentSlide < 0) {

        currentSlide = loveSlides.length - 1;

    }

    updateLoveSlide();

});


/* =========================================
   MEMORY ALBUM
========================================= */

const albumPages =
    document.querySelectorAll(".album-page");

const previousMemory =
    document.getElementById("previousMemory");

const nextMemory =
    document.getElementById("nextMemory");

const memoryPageNumber =
    document.getElementById("memoryPageNumber");

let currentMemoryPage = 0;


function updateMemoryPage() {

    albumPages.forEach((page, index) => {

        page.classList.toggle(
            "active",
            index === currentMemoryPage
        );

    });

    memoryPageNumber.textContent =
        `${currentMemoryPage + 1} / ${albumPages.length}`;

}


nextMemory.addEventListener("click", function () {

    currentMemoryPage++;

    if (currentMemoryPage >= albumPages.length) {

        currentMemoryPage = 0;

    }

    updateMemoryPage();

});


previousMemory.addEventListener("click", function () {

    currentMemoryPage--;

    if (currentMemoryPage < 0) {

        currentMemoryPage = albumPages.length - 1;

    }

    updateMemoryPage();

});


// Start on page 1
updateMemoryPage();


/* =========================================
   SURPRISE ME
========================================= */

const surprises = [

    {
        title: "You are loved. ♡",
        text: "No matter what kind of day you're having, please remember that there's someone here who loves you and wants to see you happy.",
        section: "forget"
    },

    {
        title: "Go look at our memories. ♡",
        text: "Maybe one of those little moments will make you smile.",
        section: "memories"
    },

    {
        title: "Remember why I chose you. ♡",
        text: "There are so many things I love about you. Maybe you should go read them again.",
        section: "love"
    },

    {
        title: "There's something I want you to know. ♡",
        text: "Maybe today is the day you need to read the things I've written for you.",
        section: "know"
    },

    {
        title: "Come here, Wifeyyy. ♡",
        text: "Maybe you just need a little reminder of what I want for us.",
        section: "relationship"
    }

];

let selectedSurprise = null;


surpriseButton.addEventListener("click", function () {

    const randomIndex =
        Math.floor(Math.random() * surprises.length);

    selectedSurprise = surprises[randomIndex];

    document.getElementById("surpriseTitle").textContent =
        selectedSurprise.title;

    document.getElementById("surpriseText").textContent =
        selectedSurprise.text;

    surpriseModal.classList.add("show");

});


closeModal.addEventListener("click", function () {

    surpriseModal.classList.remove("show");

});


goToSurprise.addEventListener("click", function () {

    surpriseModal.classList.remove("show");

    if (selectedSurprise) {

        showSection(selectedSurprise.section);

    }

});


/* =========================================
   CLOSE MODAL WHEN CLICKING OUTSIDE
========================================= */

surpriseModal.addEventListener("click", function (event) {

    if (event.target === surpriseModal) {

        surpriseModal.classList.remove("show");

    }

});


/* =========================================
   LOCK AGAIN
========================================= */

lockAgain.addEventListener("click", function () {

    const confirmLock =
        confirm(
            "Do you want to lock our little world again?"
        );

    if (!confirmLock) {
        return;
    }

    localStorage.removeItem(
        "ourLittleWorldUnlocked"
    );

    contentPages.forEach(page => {

        page.classList.remove("active");

    });

    mainPage.classList.remove("show");

    envelope.classList.remove("open");

    passcodeInput.value = "";

    envelopeScreen.classList.remove("active");

    lockScreen.classList.add("active");

    window.scrollTo(0, 0);

});