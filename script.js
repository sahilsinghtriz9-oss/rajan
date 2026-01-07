const staggerVisualizerEl = document.querySelector('.stagger-visualizer');
const fragment = document.createDocumentFragment();
const grid = [20, 20]; // Adjust based on screen size ideally
const col = grid[0];
const row = grid[1];
const numberOfElements = col * row;

// Generate Grid
// Increased spacing for cleaner look
for (let i = 0; i < numberOfElements; i++) {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    fragment.appendChild(dot);
}

staggerVisualizerEl.appendChild(fragment);

const staggersAnimation = anime.timeline({
    targets: '.stagger-visualizer .dot',
    easing: 'easeInOutSine',
    delay: anime.stagger(50),
    loop: true,
    autoplay: false
})
    .add({
        translateX: [
            { value: anime.stagger('-.1rem', { grid: grid, from: 'center', axis: 'x' }) },
            { value: anime.stagger('.1rem', { grid: grid, from: 'center', axis: 'x' }) }
        ],
        translateY: [
            { value: anime.stagger('-.1rem', { grid: grid, from: 'center', axis: 'y' }) },
            { value: anime.stagger('.1rem', { grid: grid, from: 'center', axis: 'y' }) }
        ],
        duration: 1500, // Slower
        scale: .5,
        delay: anime.stagger(100, { grid: grid, from: 'center' })
    })
    .add({
        translateX: () => anime.random(-10, 10),
        translateY: () => anime.random(-10, 10),
        scale: 0.1, // Shrink
        background: '#66FCF1', // Cyan accent
        duration: 800, // Slower
        delay: anime.stagger(80, { grid: grid, from: 'center' })
    })
    .add({
        translateX: 0,
        translateY: 0,
        scale: 1,
        background: '#1F2833',
        duration: 1200,
    });

staggersAnimation.play();

// Text Animation
var textWrapper = document.querySelector('.ml11 .letters');
textWrapper.innerHTML = textWrapper.textContent.replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>");

anime.timeline({ loop: false })
    .add({
        targets: '.ml11 .line',
        scaleY: [0, 1],
        opacity: [0.5, 1],
        easing: "easeOutExpo",
        duration: 1000
    })
    .add({
        targets: '.ml11 .line',
        translateX: [0, document.querySelector('.ml11 .letters').getBoundingClientRect().width + 10],
        easing: "easeOutExpo",
        duration: 1000,
        delay: 100
    })
    .add({
        targets: '.ml11 .letter',
        opacity: [0, 1],
        easing: "easeOutExpo",
        duration: 800,
        offset: '-=775',
        delay: (el, i) => 34 * (i + 1)
    })
    .add({
        targets: '.ml11 .line',
        opacity: 0,
        duration: 1000,
        easing: "easeOutExpo",
        delay: 1000
    });

// Interactive Grid Effect on Click
document.addEventListener('click', function (e) {
    anime({
        targets: '.dot',
        scale: [
            { value: .1, easing: 'easeOutSine', duration: 500 },
            { value: 1, easing: 'easeInOutQuad', duration: 1200 }
        ],
        delay: anime.stagger(200, { grid: grid, from: 'center' }),
        backgroundColor: [
            { value: '#66FCF1', easing: 'easeOutSine', duration: 500 },
            { value: '#1F2833', easing: 'easeInOutQuad', duration: 1200 }
        ]
    });
});

// Scroll Reveal Observer
const sections = document.querySelectorAll('.section');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            anime({
                targets: entry.target,
                translateY: [20, 0],
                opacity: [0, 1],
                duration: 800,
                easing: 'easeOutExpo'
            });
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

sections.forEach(section => {
    observer.observe(section);
});
