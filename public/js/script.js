let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');
let body = document.querySelector('body');

body.classList.add('initial-load');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
    body.classList.toggle('menu-open');
};

window.addEventListener('load', () => {
    setTimeout(() => {
        body.classList.remove('initial-load');
    }, 300);
});


const titles = ['Web Developer', 'Frontend Developer', 'Backend Developer', 'Script Developer', 'Full Stack Developer'];
let currentTitleIndex = 0;
const developerTitleElement = document.getElementById('developer-title');
const cursorElement = document.querySelector('.cursor');

function updateTitle() {
    const currentTitle = titles[currentTitleIndex];
    let charIndex = currentTitle.length;

    cursorElement.style.visibility = 'visible';

    const deleteInterval = setInterval(() => {
        if (charIndex > 0) {
            developerTitleElement.textContent = currentTitle.substring(0, charIndex - 1);
            charIndex--;
        } else {
            clearInterval(deleteInterval);
            cursorElement.style.visibility = 'hidden';
            currentTitleIndex = (currentTitleIndex + 1) % titles.length;
            const nextTitle = titles[currentTitleIndex];
            charIndex = 0;

            cursorElement.style.visibility = 'visible';

            const typeInterval = setInterval(() => {
                if (charIndex <= nextTitle.length) {
                    developerTitleElement.textContent = nextTitle.substring(0, charIndex);
                    charIndex++;
                } else {
                    clearInterval(typeInterval);
                    cursorElement.style.visibility = 'hidden';
                    setTimeout(updateTitle, 2000);
                }
            }, 100);
        }
    }, 100);
}

cursorElement.style.visibility = 'hidden';
setTimeout(updateTitle, 2000);