// js/main.js
// Main JavaScript for the Star Trek Viewing Order interactive timeline project.
// Handles data, rendering, navigation, card flipping, theme switching, and order toggling.

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
     // --- Data Section ---
    // storyOrderData: Array of Star Trek series, movies, and crossover points in story chronology order
    // releaseOrderData: Same as above, but sorted by release year
    const storyOrderData = [
        { type: 'series', title: 'Star Trek: Enterprise', content: 'Seasons 1-4', releaseYear: '2001-2005', platform: 'TV', imdb: '8.1', summary: 'Set before the Federation, this series chronicles the early days of space exploration with Captain Jonathan Archer and the first Warp 5 starship, Enterprise NX-01.', trivia: 'The show\'s theme song, "Where My Heart Will Take Me," was a controversial departure from traditional orchestral themes.' },
        { type: 'series', title: 'Star Trek: Discovery', content: 'Seasons 1-2 (Prequel)', releaseYear: '2017-2019', platform: 'OTT', imdb: '7.1', summary: 'Set a decade before TOS, this series follows Michael Burnham, Spock\'s adoptive sister, and the crew of the USS Discovery during the Federation-Klingon war.', trivia: 'The show\'s visual style, particularly the Klingon redesign, was a topic of much debate among fans.'},
        { type: 'series', title: 'Star Trek: Strange New Worlds', content: 'Seasons 1+ (Prequel)', releaseYear: '2022-Present', platform: 'OTT', imdb: '8.6', summary: 'This series returns to an episodic format, chronicling the adventures of Captain Pike, Spock, and Number One aboard the USS Enterprise.', trivia: 'The show was created due to overwhelming fan demand for these characters after their appearance in Discovery.'},
        { type: 'series', title: 'Star Trek: The Original Series', content: 'Seasons 1-3', releaseYear: '1966-1969', platform: 'TV', imdb: '8.4', summary: 'The voyages of the starship USS Enterprise, on a five-year mission to explore strange new worlds, seek out new life and new civilizations, and to boldly go where no man has gone before.', trivia: 'Featured the first interracial kiss on American television between Captain Kirk and Lt. Uhura.' },
        { type: 'series', title: 'Star Trek: The Animated Series', content: 'Seasons 1-2', releaseYear: '1973-1974', platform: 'TV', imdb: '7.6', summary: 'The further animated adventures of the USS Enterprise crew, continuing where the original series left off.', trivia: 'It won a Daytime Emmy Award, a first for any Star Trek series.' },
        { type: 'movie', title: 'Star Trek: The Motion Picture', releaseYear: '1979', platform: 'Theater', imdb: '6.4', summary: 'A massive alien entity called V\'Ger approaches Earth, and Admiral Kirk must reassume command of the Enterprise to stop it.', trivia: 'This film had a budget of around $44 million, making it one of the most expensive films of its time.' },
        { type: 'movie', title: 'Star Trek II: The Wrath of Khan', releaseYear: '1982', platform: 'Theater', imdb: '7.7', summary: 'Kirk\'s arch-nemesis, Khan Noonien Singh, returns to seek revenge and seizes a powerful terraforming device.', trivia: 'The Genesis Device presentation was the first fully CGI sequence in a feature film.' },
        { type: 'movie', title: 'Star Trek III: The Search for Spock', releaseYear: '1984', platform: 'Theater', imdb: '6.7', summary: 'After Spock\'s sacrifice, the Enterprise crew risks everything to find him and restore his living spirit.', trivia: 'This film marked Leonard Nimoy\'s directorial debut.' },
        { type: 'movie', title: 'Star Trek IV: The Voyage Home', releaseYear: '1986', platform: 'Theater', imdb: '7.3', summary: 'To save Earth from a destructive alien probe, the crew must travel back in time to 1986 to find humpback whales.', trivia: 'The most lighthearted and comedic of the original films, it was also the most financially successful.' },
        { type: 'series', title: 'Star Trek: The Next Generation', content: 'Seasons 1-5', releaseYear: '1987-1994', platform: 'TV', imdb: '8.7', summary: 'Set a century after the original series, this show follows the adventures of the USS Enterprise-D under the command of Captain Jean-Luc Picard.', trivia: 'Patrick Stewart was so convinced the show would fail that he didn\'t fully unpack his bags for the first six weeks.' },
        { type: 'movie', title: 'Star Trek V: The Final Frontier', releaseYear: '1989', platform: 'Theater', imdb: '5.5', summary: 'Spock\'s half-brother hijacks the Enterprise to search for a mythical planet at the center of the galaxy, believed to be Eden or Heaven.', trivia: 'Directed by William Shatner, the film is often considered a low point for the movie franchise by fans and critics.' },
        { type: 'movie', title: 'Star Trek VI: The Undiscovered Country', releaseYear: '1991', platform: 'Theater', imdb: '7.2', summary: 'The Enterprise crew is framed for the assassination of the Klingon Chancellor, threatening a new era of peace between the Federation and the Klingon Empire.', trivia: 'The final film to feature the entire original cast.' },
        { type: 'series', title: 'Star Trek: The Next Generation', content: 'Season 6', releaseYear: '1992-1993', platform: 'TV', imdb: '8.7', summary: 'The adventures of the Enterprise-D continue, with many episodes delving deeper into the characters and the political landscape.', trivia: 'This season features the famous episode "Chain of Command," where Picard is tortured by the Cardassians.' },
        { type: 'crossover', title: 'Crossover Point!', content: 'Start watching Deep Space Nine. Alternate between new episodes of TNG and DS9.', releaseYear: '1993', platform: 'TV', imdb: 'N/A', summary: 'As The Next Generation enters its later years, a new series begins, set on a space station. The timelines run concurrently.', trivia: 'DS9 begins during TNG\'s 6th season.' },
        { type: 'series', title: 'Star Trek: Deep Space Nine', content: 'Season 1', releaseYear: '1993', platform: 'TV', imdb: '8.1', summary: 'Commander Benjamin Sisko is assigned to a former Cardassian space station orbiting the planet Bajor, guarding a newly discovered stable wormhole.', trivia: 'Unlike other Trek series, it is set on a space station, not a starship, leading to more serialized storytelling.' },
        { type: 'series', title: 'Star Trek: The Next Generation', content: 'Season 7', releaseYear: '1993-1994', platform: 'TV', imdb: '8.7', summary: 'The final season of TNG wraps up long-running character arcs and concludes with the critically acclaimed finale, "All Good Things...".', trivia: 'The finale was watched by over 30 million viewers.' },
        { type: 'series', title: 'Star Trek: Deep Space Nine', content: 'Season 2', releaseYear: '1993-1994', platform: 'TV', imdb: '8.1', summary: 'The station becomes a key strategic location as the political and military threat from the Gamma Quadrant begins to grow.', trivia: 'The introduction of the Dominion as a major antagonist sets the stage for the rest of the series.' },
        { type: 'movie', title: 'Star Trek: Generations', releaseYear: '1994', platform: 'Theater', imdb: '6.6', summary: 'Captain Picard and the TNG crew must stop a scientist from destroying a star system, leading to a fateful meeting with Captain Kirk.', trivia: 'Malcolm McDowell, who played the villain Soran, received death threats from fans for killing Captain Kirk.' },
        { type: 'crossover', title: 'Crossover Point!', content: 'DS9 continues. Now, start watching Voyager.', releaseYear: '1995', platform: 'TV', imdb: 'N/A', summary: 'As DS9 hits its stride, another series, Voyager, begins. Both shows run in parallel for several years.', trivia: 'The pilot of Voyager aired just two months before the DS9 Season 3 finale.' },
        { type: 'series', title: 'Star Trek: Deep Space Nine', content: 'Season 3', releaseYear: '1994-1995', platform: 'TV', imdb: '8.1', summary: 'The Dominion War looms as the USS Defiant is introduced, giving the crew a powerful warship to explore the Gamma Quadrant.', trivia: 'This season marked a turning point for the series, becoming darker and more focused on the impending war.' },
        { type: 'series', title: 'Star Trek: Voyager', content: 'Season 1', releaseYear: '1995', platform: 'TV', imdb: '7.8', summary: 'The USS Voyager is thrown 70,000 light-years across the galaxy into the Delta Quadrant and must begin a long journey home.', trivia: 'The first Star Trek series to feature a female captain, Kathryn Janeway, in the lead role.' },
        { type: 'series', title: 'Star Trek: Deep Space Nine', content: 'Season 4', releaseYear: '1995-1996', platform: 'TV', imdb: '8.1', summary: 'The Klingon Empire becomes a major antagonist, and Worf from TNG joins the station\'s crew.', trivia: 'The episode "Trials and Tribble-ations" digitally inserted the DS9 cast into the classic TOS episode "The Trouble with Tribbles".' },
        { type: 'series', title: 'Star Trek: Voyager', content: 'Season 2', releaseYear: '1995-1996', platform: 'TV', imdb: '7.8', summary: 'The crew continues to navigate the dangers of the Delta Quadrant, facing new species and internal conflicts.', trivia: 'This season explores the uneasy alliance between the Starfleet and Maquis members of the crew.' },
        { type: 'movie', title: 'Star Trek: First Contact', releaseYear: '1996', platform: 'Theater', imdb: '7.6', summary: 'The Borg travel back in time to prevent humanity\'s first contact with aliens. The Enterprise-E crew must follow them to stop their plan.', trivia: 'Widely considered the best of the TNG movies, it was a critical and commercial success.' },
        { type: 'series', title: 'Star Trek: Deep Space Nine', content: 'Season 5', releaseYear: '1996-1997', platform: 'TV', imdb: '8.1', summary: 'The Dominion War begins in earnest, pushing Sisko and his crew to their limits in a galactic-scale conflict.', trivia: 'This season features some of the largest and most complex space battle sequences seen in Star Trek up to that point.' },
        { type: 'series', title: 'Star Trek: Voyager', content: 'Season 3', releaseYear: '1996-1997', platform: 'TV', imdb: '7.8', summary: 'Voyager encounters formidable new foes and finds new ways to survive in the hostile Delta Quadrant.', trivia: 'Features the popular two-part episode "Scorpion," which introduces the Borg\'s enemy, Species 8472.' },
        { type: 'series', title: 'Star Trek: Deep Space Nine', content: 'Season 6', releaseYear: '1997-1998', platform: 'TV', imdb: '8.1', summary: 'The war with the Dominion rages on, with major victories and devastating losses for the Federation and its allies.', trivia: 'The season-long arc is one of the most serialized and acclaimed storylines in Star Trek history.' },
        { type: 'series', title: 'Star Trek: Voyager', content: 'Season 4', releaseYear: '1997-1998', platform: 'TV', imdb: '7.8', summary: 'The former Borg drone, Seven of Nine, joins the crew, bringing new dynamics and conflict to the ship.', trivia: 'Jeri Ryan\'s addition as Seven of Nine was a ratings boost and she became one of the show\'s most popular characters.' },
        { type: 'movie', title: 'Star Trek: Insurrection', releaseYear: '1998', platform: 'Theater', imdb: '6.4', summary: 'Captain Picard and the crew defy a Starfleet admiral to protect a peaceful planet and its fountain of youth from being exploited.', trivia: 'The plot is often described by fans as feeling like an extended, two-part episode of the TV series.' },
        { type: 'series', title: 'Star Trek: Deep Space Nine', content: 'Season 7', releaseYear: '1998-1999', platform: 'TV', imdb: '8.1', summary: 'The final season brings the epic Dominion War to a close and provides conclusions for the show\'s beloved characters.', trivia: 'The series finale, "What You Leave Behind," is a poignant and well-regarded conclusion to the saga.' },
        { type: 'series', title: 'Star Trek: Voyager', content: 'Seasons 5-7', releaseYear: '1998-2001', platform: 'TV', imdb: '7.8', summary: 'In its final seasons, Voyager gets closer to home, facing final challenges and making a daring attempt to end their journey.', trivia: 'The finale, "Endgame," features an alternate future where Admiral Janeway gives her past self a major technological advantage.' },
        { type: 'movie', title: 'Star Trek: Nemesis', releaseYear: '2002', platform: 'Theater', imdb: '6.4', summary: 'Captain Picard confronts a new Romulan leader who is a younger clone of himself, leading to a final, tragic battle for the TNG crew.', trivia: 'This was the final film for the TNG cast. Tom Hardy played the villain, Shinzon, before his rise to superstardom.' },
        { type: 'series', title: 'Star Trek: Lower Decks', content: 'Seasons 1+ (Post-Nemesis)', releaseYear: '2020-Present', platform: 'OTT', imdb: '8.0', summary: 'An animated comedy focusing on the low-ranking crew of one of Starfleet\'s least important ships, the USS Cerritos.', trivia: 'The show is packed with in-jokes and references to almost every previous Star Trek series and movie.'},
        { type: 'series', title: 'Star Trek: Prodigy', content: 'Seasons 1+ (Post-Nemesis)', releaseYear: '2021-Present', platform: 'OTT', imdb: '7.7', summary: 'An animated series following alien teenagers who discover a Starfleet ship, the USS Protostar, and are guided by a hologram of Captain Janeway.', trivia: 'This is the first Star Trek series to be co-produced with Nickelodeon Animation Studio.'},
        { type: 'series', title: 'Star Trek: Picard', content: 'Seasons 1-3 (Post-Nemesis)', releaseYear: '2020-2023', platform: 'OTT', imdb: '8.1', summary: 'Decades after Nemesis, a retired Jean-Luc Picard is drawn back into a dangerous new adventure to help a mysterious young woman.', trivia: 'The third and final season served as a full reunion for the main cast of The Next Generation.'},
        { type: 'series', title: 'Star Trek: Discovery', content: 'Seasons 3-5 (Far Future)', releaseYear: '2020-2024', platform: 'OTT', imdb: '7.1', summary: 'The Discovery crew travels to the 32nd century, a future where the Federation is a shadow of its former self.', trivia: 'This time jump effectively rebooted the show, allowing for entirely new stories unconstrained by established canon.'},
        { type: 'crossover', title: 'Note: Kelvin Timeline', content: 'The following films are reboots in an alternate reality. Watch them anytime.', releaseYear: '2009-2016', platform: 'Theater', imdb: 'N/A', summary: 'J.J. Abrams\' movies created an alternate timeline after a Romulan ship from the future destroyed the USS Kelvin, allowing for new stories with the original characters.', trivia: 'Leonard Nimoy appears as Spock Prime, connecting the two timelines.'},
        { type: 'movie', title: 'Star Trek', releaseYear: '2009', platform: 'Theater', imdb: '7.9', summary: 'A young James T. Kirk and Spock must overcome their differences to stop a vengeful Romulan from the future.', trivia: 'This film was the first Star Trek movie to win an Academy Award (for Best Makeup).'},
        { type: 'movie', title: 'Star Trek Into Darkness', releaseYear: '2013', platform: 'Theater', imdb: '7.7', summary: 'The Enterprise crew pursues a one-man weapon of mass destruction, leading to a confrontation that reimagines a classic Star Trek villain.', trivia: 'The identity of the villain, played by Benedict Cumberbatch, was a closely guarded secret before the film\'s release.'},
        { type: 'movie', 'title': 'Star Trek Beyond', 'releaseYear': '2016', 'platform': 'Theater', 'imdb': '7.0', 'summary': 'The Enterprise is destroyed by a ruthless new enemy, stranding Kirk and his crew on an uncharted planet.', 'trivia': 'The film was co-written by Simon Pegg, who also plays Scotty.'}
    ];
    
    const releaseOrderData = [...storyOrderData].sort((a, b) => {
        if (a.releaseYear === 'N/A' || b.releaseYear === 'N/A') return 0;
        const yearA = parseInt(a.releaseYear.split('-')[0]);
        const yearB = parseInt(b.releaseYear.split('-')[0]);
        return yearA - yearB;
    });

    // --- DOM Elements ---
    // Grabs references to all interactive elements (slider, buttons, toggles, labels)
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

    const scrollBarContainer = document.createElement('div');
    scrollBarContainer.className = 'w-full flex justify-center my-4';
    const scrollBar = document.createElement('input');
    scrollBar.type = 'range';
    scrollBar.id = 'timelineScrollBar';
    scrollBar.min = 0;
    scrollBar.value = 0;
    scrollBar.className = 'w-3/4';
    scrollBarContainer.appendChild(scrollBar);
    // Insert the scrollbar between the card slider and navigation buttons
    const timelineContainer = document.getElementById('timelineContainer');
    timelineContainer.parentNode.insertBefore(scrollBarContainer, timelineContainer.nextSibling);

    // --- State Variables ---
    // currentStep: Index of the currently focused card
    // currentOrder: 'story' or 'release' (viewing order)
    let currentStep = 0;
    let currentOrder = 'story'; 

    // --- Core Functions ---
    // getCurrentData: Returns the current data array based on selected order
    // renderTimeline: Renders all cards in the slider
    // addCardClickListeners: Adds click-to-flip event to each card
    // updateUI: Updates card positions, scaling, and navigation state
    // handleOrderChange: Handles switching between story/release order
    // handleThemeChange: Handles switching between dark/light theme
    function getCurrentData() {
        return currentOrder === 'story' ? storyOrderData : releaseOrderData;
    }

    function renderTimeline() {
        const data = getCurrentData();
        cardSlider.innerHTML = ''; 
        data.forEach((item, index) => {
            const frontCardClass = `card-${item.type}-front`;
            const backCardClass = `card-${item.type}-back`;
            let typeLabel = '', iconSVG = '';
            switch (item.type) {
                case 'series': typeLabel = 'TV Series'; iconSVG = `<svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>`; break;
                case 'movie': typeLabel = 'Movie'; iconSVG = `<svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>`; break;
                case 'crossover': typeLabel = 'Viewing Note'; iconSVG = `<svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`; break;
            }
            const cardHTML = `
                <div id="card-wrapper-${index}" class="timeline-card-wrapper">
                    <div class="flip-card">
                        <div class="flip-card-inner">
                            <div class="flip-card-front ${frontCardClass}">
                                <div class="flex items-center text-sm font-semibold mb-2">${iconSVG}${typeLabel}</div>
                                <h3 class="text-xl font-bold mb-2">${item.title}</h3>
                                <p class="text-sm">${item.content || ''}</p>
                                <div class="mt-auto text-center text-xs opacity-70">Click to flip</div>
                            </div>
                            <div class="flip-card-back ${backCardClass}">
                                <h4 class="font-bold text-lg mb-2">${item.title}</h4>
                                <p class="text-sm mb-1"><strong class="font-semibold">Release:</strong> ${item.releaseYear}</p>
                                <p class="text-sm mb-1"><strong class="font-semibold">Platform:</strong> ${item.platform}</p>
                                <p class="text-sm mb-3"><strong class="font-semibold">IMDB:</strong> ${item.imdb}/10</p>
                                <p class="text-xs mb-2"><strong class="font-semibold block mb-1">Summary:</strong> ${item.summary}</p>
                                <p class="text-xs"><strong class="font-semibold block mb-1">Trivia:</strong> ${item.trivia}</p>
                            </div>
                        </div>
                    </div>
                </div>`;
            cardSlider.innerHTML += cardHTML;
        });
        scrollBar.max = data.length - 1;
        scrollBar.value = currentStep;
        addCardClickListeners();
        updateUI();
    }

    function addCardClickListeners() {
        document.querySelectorAll('.flip-card').forEach(card => card.addEventListener('click', () => card.classList.toggle('is-flipped')));
    }

    function updateUI() {
        const data = getCurrentData();
        const wrappers = document.querySelectorAll('.timeline-card-wrapper');
        
        const cardWidth = wrappers.length > 0 ? wrappers[0].offsetWidth : 0;
        const cardMargin = wrappers.length > 0 ? parseInt(window.getComputedStyle(wrappers[0]).marginRight) * 2 : 0;
        const totalCardWidth = cardWidth + cardMargin;
        
        const translateValue = - (currentStep * totalCardWidth);
        cardSlider.style.transform = `translateX(calc(50% + ${translateValue}px - ${totalCardWidth / 2}px))`;

        wrappers.forEach((wrapper, index) => {
            const flipCard = wrapper.querySelector('.flip-card');
            if (index === currentStep) {
                wrapper.style.transform = 'scale(1.05)';
                wrapper.style.opacity = '1';
                flipCard.querySelector('.flip-card-inner').style.boxShadow = '0 8px 25px rgba(250, 204, 21, 0.3)';
            } else {
                wrapper.style.transform = 'scale(0.9)';
                wrapper.style.opacity = '0.6';
                flipCard.querySelector('.flip-card-inner').style.boxShadow = '0 4px 8px 0 rgba(0,0,0,0.2)';
                flipCard.classList.remove('is-flipped');
            }
        });

        prevBtn.disabled = currentStep === 0;
        nextBtn.disabled = currentStep === data.length - 1;
        stepCounter.textContent = `Step ${currentStep + 1} of ${data.length}`;
        scrollBar.value = currentStep;
    }

    function handleOrderChange() {
        currentOrder = orderToggle.checked ? 'release' : 'story';
        if (orderToggle.checked) {
            releaseLabel.classList.replace('text-gray-500', 'text-indigo-400');
            chronoLabel.classList.replace('text-indigo-400', 'text-gray-500');
        } else {
            chronoLabel.classList.replace('text-gray-500', 'text-indigo-400');
            releaseLabel.classList.replace('text-indigo-400', 'text-gray-500');
        }
        currentStep = 0;
        renderTimeline(); 
    }

    function handleThemeChange() {
        document.body.classList.toggle('light-theme');
        if (themeToggle.checked) {
            lightLabel.classList.replace('text-gray-500', 'text-indigo-400');
            darkLabel.classList.replace('text-indigo-400', 'text-gray-500');
        } else {
            darkLabel.classList.replace('text-gray-500', 'text-indigo-400');
            lightLabel.classList.replace('text-indigo-400', 'text-gray-500');
        }
    }
    
    orderToggle.addEventListener('change', handleOrderChange);
    themeToggle.addEventListener('change', handleThemeChange);

    const orderDot = document.getElementById('orderDot');
    const themeDot = document.getElementById('themeDot');
    orderToggle.addEventListener('change', () => {
         if (orderToggle.checked) {
            orderDot.style.transform = 'translateX(1.5rem)';
         } else {
            orderDot.style.transform = 'translateX(0)';
         }
    });
    themeToggle.addEventListener('change', () => {
         if (themeToggle.checked) {
            themeDot.style.transform = 'translateX(1.5rem)';
         } else {
            themeDot.style.transform = 'translateX(0)';
         }
    });


    // --- Scrollbar event: move cards ---
    scrollBar.addEventListener('input', (e) => {
        currentStep = parseInt(e.target.value);
        updateUI();
    });

    // --- Update next/prev buttons to sync scrollbar ---
    nextBtn.addEventListener('click', () => {
        if (currentStep < getCurrentData().length - 1) {
            currentStep++;
            scrollBar.value = currentStep;
            updateUI();
        }
    });

    prevBtn.addEventListener('click', () => {
        if (currentStep > 0) {
            currentStep--;
            scrollBar.value = currentStep;
            updateUI();
        }
    });

    // Initial render
    renderTimeline();
    window.addEventListener('resize', updateUI);
});
