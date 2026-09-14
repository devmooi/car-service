const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
const menuOverlay = document.getElementById('menuOverlay');

function toggleMenu(open) {
    const shouldOpen = typeof open === 'boolean' ? open : !navMenu.classList.contains('active');
    navMenu.classList.toggle('active', shouldOpen);
    menuToggle.classList.toggle('active', shouldOpen);
    menuOverlay.classList.toggle('active', shouldOpen);
    menuToggle.setAttribute('aria-expanded', String(shouldOpen));
    menuToggle.setAttribute('aria-label', shouldOpen ? '메뉴 닫기' : '메뉴 열기');
}

menuToggle.addEventListener('click', () => toggleMenu());
menuOverlay.addEventListener('click', () => toggleMenu(false));

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        toggleMenu(false);
    }
});