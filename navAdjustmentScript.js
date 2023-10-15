const headerTitleContainerEl = document.querySelector(
  '.header__title-container'
);
const headerNavEl = document.querySelector('.header__nav');

// Function to add padding when window size is below or equal to 768px
function addPadding() {
  if (window.innerWidth <= 768) {
    headerNavEl.style.paddingTop = headerTitleContainerEl.offsetHeight + 'px';
  } else {
    // Remove padding when window size is above 768px
    headerNavEl.style.paddingTop = '0';
  }
}

// Initial padding
addPadding();

// Listen for window resize events
window.addEventListener('resize', function () {
  // Check and update padding on window resize
  addPadding();
});
