// script.js
// Main JavaScript for the Star Trek Viewing Order interactive timeline project.
// Handles data loading, rendering, navigation, card flipping, theme switching, and order toggling.

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Elements ---
    const cardSlider = document.getElementById('card-slider');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const stepCounter = document.getElementById('stepCounter');
    const orderToggle = document.getElementById('orderToggle');
    const themeToggle = document.getElementById('themeToggle');
    const chronoLabel = document.getElementById('chronoLabel');
    const releaseLabel = document.getElementById('releaseLabel');
    const darkLabel = document.getElementById('darkLabel');
    const lightLabel = document.getElementById('lightLabel');
    const orderDot = document.getElementById('orderDot');
    const themeDot = document.getElementById('themeDot');
    const timelineContainer = document.getElementById('timelineContainer');

    // Guard: ensure all required elements exist
    if (!cardSlider || !prevBtn || !nextBtn || !stepCounter || !orderToggle || !themeToggle || !timelineContainer) {
        console.error('Required DOM elements not found. Aborting initialization.');
        return;
    }

    // --- Scrollbar Setup ---
    const scrollBarContainer = document.createElement('div');
    scrollBarContainer.className = 'w-full flex justify-center my-4';
    const scrollBar = document.createElement('input');
    scrollBar.type = 'range';
    scrollBar.id = 'timelineScrollBar';
    scrollBar.min = 0;
    scrollBar.value = 0;
    scrollBar.setAttribute('aria-label', 'Timeline position');
    scrollBar.className = 'w-3/4';
    scrollBarContainer.appendChild(scrollBar);
    timelineContainer.parentNode.insertBefore(scrollBarContainer, timelineContainer.nextSibling);

    // --- State Variables ---
    let currentStep = 0;
    let currentOrder = 'story';
    let storyOrderData = [];
    let releaseOrderData = [];

    // --- Utility: Sanitize HTML to prevent XSS ---
    function sanitize(str) {
        if (str == null) return '';
        const div = document.createElement('div');
        div.textContent = String(str);
        return div.innerHTML;
    }

    // --- Data Loading ---
    async function loadTimelineData() {
        try {
            cardSlider.innerHTML = '<div class="loading-spinner">Loading timeline data…</div>';
            const response = await fetch('data/timeline.json');
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            const data = await response.json();
            storyOrderData = data.storyOrder || [];
            releaseOrderData = [...storyOrderData].sort((a, b) => {
                if (a.releaseYear === 'N/A' || b.releaseYear === 'N/A') return 0;
                const yearA = parseInt(a.releaseYear.split('-')[0]);
                const yearB = parseInt(b.releaseYear.split('-')[0]);
                return yearA - yearB;
            });
            return true;
        } catch (error) {
            console.error('Failed to load timeline data:', error);
            cardSlider.innerHTML = '<div class="loading-spinner text-red-400">Failed to load timeline data. Please try refreshing the page.</div>';
            return false;
        }
    }

    // --- Core Functions ---
    function getCurrentData() {
        return currentOrder === 'story' ? storyOrderData : releaseOrderData;
    }

    // SVG icons for card types
    const ICONS = {
        series: '<svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>',
        movie: '<svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>',
        crossover: '<svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>'
    };

    const TYPE_LABELS = {
        series: 'TV Series',
        movie: 'Movie',
        crossover: 'Viewing Note'
    };

    function renderTimeline() {
        const data = getCurrentData();
        if (data.length === 0) return;

        // Build all card HTML at once, then assign (avoids repeated DOM re-parsing)
        let html = '';
        data.forEach((item, index) => {
            const frontCardClass = `card-${sanitize(item.type)}-front`;
            const backCardClass = `card-${sanitize(item.type)}-back`;
            const typeLabel = TYPE_LABELS[item.type] || '';
            const iconSVG = ICONS[item.type] || '';

            html += `
                <div id="card-wrapper-${index}" class="timeline-card-wrapper" role="group" aria-roledescription="card" aria-label="${sanitize(item.title)}">
                    <div class="flip-card" tabindex="0" role="button" aria-pressed="false" aria-label="${sanitize(item.title)} — click or press Enter to flip for details">
                        <div class="flip-card-inner">
                            <div class="flip-card-front ${frontCardClass}">
                                <div class="flex items-center text-sm font-semibold mb-2">${iconSVG}${sanitize(typeLabel)}</div>
                                <h3 class="text-xl font-bold mb-2">${sanitize(item.title)}</h3>
                                <p class="text-sm">${sanitize(item.content || '')}</p>
                                <div class="mt-auto text-center text-xs opacity-70">Click to flip</div>
                            </div>
                            <div class="flip-card-back ${backCardClass}">
                                <h4 class="font-bold text-lg mb-2">${sanitize(item.title)}</h4>
                                <p class="text-sm mb-1"><strong class="font-semibold">Release:</strong> ${sanitize(item.releaseYear)}</p>
                                <p class="text-sm mb-1"><strong class="font-semibold">Platform:</strong> ${sanitize(item.platform)}</p>
                                <p class="text-sm mb-3"><strong class="font-semibold">IMDB:</strong> ${sanitize(item.imdb)}/10</p>
                                <p class="text-xs mb-2"><strong class="font-semibold block mb-1">Summary:</strong> ${sanitize(item.summary)}</p>
                                <p class="text-xs"><strong class="font-semibold block mb-1">Trivia:</strong> ${sanitize(item.trivia)}</p>
                            </div>
                        </div>
                    </div>
                </div>`;
        });
        cardSlider.innerHTML = html;

        scrollBar.max = data.length - 1;
        scrollBar.value = currentStep;
        addCardInteractions();
        updateUI();
    }

    function addCardInteractions() {
        document.querySelectorAll('.flip-card').forEach(card => {
            // Click to flip
            card.addEventListener('click', () => {
                card.classList.toggle('is-flipped');
                const isFlipped = card.classList.contains('is-flipped');
                card.setAttribute('aria-pressed', isFlipped ? 'true' : 'false');
            });
            // Keyboard: Enter or Space to flip
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    card.classList.toggle('is-flipped');
                    const isFlipped = card.classList.contains('is-flipped');
                    card.setAttribute('aria-pressed', isFlipped ? 'true' : 'false');
                }
            });
        });
    }

    function updateUI() {
        const data = getCurrentData();
        if (data.length === 0) return;

        const wrappers = document.querySelectorAll('.timeline-card-wrapper');
        const cardWidth = wrappers.length > 0 ? wrappers[0].offsetWidth : 0;
        const cardMargin = wrappers.length > 0 ? parseInt(window.getComputedStyle(wrappers[0]).marginRight) * 2 : 0;
        const totalCardWidth = cardWidth + cardMargin;
        const translateValue = -(currentStep * totalCardWidth);
        cardSlider.style.transform = `translateX(calc(50% + ${translateValue}px - ${totalCardWidth / 2}px))`;

        wrappers.forEach((wrapper, index) => {
            const flipCard = wrapper.querySelector('.flip-card');
            if (index === currentStep) {
                wrapper.style.transform = 'scale(1.05)';
                wrapper.style.opacity = '1';
                flipCard.querySelector('.flip-card-inner').style.boxShadow = '0 8px 25px rgba(250, 204, 21, 0.3)';
                wrapper.setAttribute('aria-current', 'step');
            } else {
                wrapper.style.transform = 'scale(0.9)';
                wrapper.style.opacity = '0.6';
                flipCard.querySelector('.flip-card-inner').style.boxShadow = '0 4px 8px 0 rgba(0,0,0,0.2)';
                flipCard.classList.remove('is-flipped');
                flipCard.setAttribute('aria-pressed', 'false');
                wrapper.removeAttribute('aria-current');
            }
        });

        prevBtn.disabled = currentStep === 0;
        nextBtn.disabled = currentStep === data.length - 1;
        stepCounter.textContent = `Step ${currentStep + 1} of ${data.length}`;
        scrollBar.value = currentStep;
    }

    // --- Navigation ---
    function goToStep(step) {
        const data = getCurrentData();
        if (step < 0 || step >= data.length) return;
        currentStep = step;
        updateUI();
        // Focus the current card for screen readers
        const currentCard = document.querySelector(`#card-wrapper-${currentStep} .flip-card`);
        if (currentCard) currentCard.focus({ preventScroll: true });
    }

    nextBtn.addEventListener('click', () => goToStep(currentStep + 1));
    prevBtn.addEventListener('click', () => goToStep(currentStep - 1));
    scrollBar.addEventListener('input', (e) => {
        currentStep = parseInt(e.target.value);
        updateUI();
    });

    // --- Keyboard Navigation (Arrow keys) ---
    document.addEventListener('keydown', (e) => {
        // Only navigate when not focused on an input or textarea
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
            e.preventDefault();
            goToStep(currentStep + 1);
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
            e.preventDefault();
            goToStep(currentStep - 1);
        }
    });

    // --- Order Toggle (consolidated — single listener) ---
    orderToggle.addEventListener('change', () => {
        currentOrder = orderToggle.checked ? 'release' : 'story';
        orderToggle.setAttribute('aria-checked', orderToggle.checked ? 'true' : 'false');
        if (orderToggle.checked) {
            releaseLabel.classList.replace('text-gray-500', 'text-indigo-400');
            chronoLabel.classList.replace('text-indigo-400', 'text-gray-500');
            orderDot.style.transform = 'translateX(1.5rem)';
        } else {
            chronoLabel.classList.replace('text-gray-500', 'text-indigo-400');
            releaseLabel.classList.replace('text-indigo-400', 'text-gray-500');
            orderDot.style.transform = 'translateX(0)';
        }
        currentStep = 0;
        renderTimeline();
    });

    // --- Theme Toggle (consolidated — single listener) ---
    themeToggle.addEventListener('change', () => {
        document.body.classList.toggle('light-theme');
        themeToggle.setAttribute('aria-checked', themeToggle.checked ? 'true' : 'false');
        if (themeToggle.checked) {
            lightLabel.classList.replace('text-gray-500', 'text-indigo-400');
            darkLabel.classList.replace('text-indigo-400', 'text-gray-500');
            themeDot.style.transform = 'translateX(1.5rem)';
        } else {
            darkLabel.classList.replace('text-gray-500', 'text-indigo-400');
            lightLabel.classList.replace('text-indigo-400', 'text-gray-500');
            themeDot.style.transform = 'translateX(0)';
        }
    });

    // --- Initialize ---
    async function init() {
        const loaded = await loadTimelineData();
        if (loaded) {
            renderTimeline();
            window.addEventListener('resize', updateUI);
        }
    }

    init();
});
