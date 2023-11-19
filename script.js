document.getElementById('toggle-labels').addEventListener('change', function(e) {
    var categories = document.querySelectorAll('[id^="category"]');

    categories.forEach(function(category) {
        if (e.target.checked) {
            // Fade in
            category.style.opacity = 0;
            category.style.display = 'block';
            setTimeout(function() { 
                category.style.opacity = 1;
            }, 10); // Delay needed for the browser to register 'display' change
        } else {
            // Fade out
            category.style.opacity = 0;
            setTimeout(function() { 
                category.style.display = 'none'; 
            }, 500); // Delay should match the CSS transition duration
        }
    });
});


window.onload = function() {
    const svgElement = document.querySelector('svg');

    if (svgElement) {
        const svgBounds = svgElement.getBoundingClientRect();

        const verticalScrollPosition = window.pageYOffset + svgBounds.top + (svgBounds.height / 2) - (window.innerHeight / 2);
        const horizontalScrollPosition = window.pageXOffset + svgBounds.left + (svgBounds.width / 2) - (window.innerWidth / 2);

        window.scrollTo({
            top: verticalScrollPosition,
            left: horizontalScrollPosition,
            behavior: 'smooth'
        });
    }
};

document.getElementById('randomButton').addEventListener('click', function() {
    const svgLinks = document.querySelectorAll('svg a');
    if (svgLinks.length === 0) return; // Check if there are any links

    const randomIndex = Math.floor(Math.random() * svgLinks.length); // Get a random index
    const randomLink = svgLinks[randomIndex];

    // Correctly accessing the href attribute for SVG elements
    const href = randomLink.href.baseVal;

    // Navigate to the link's href or perform any action required
    window.location.href = href;
});

document.addEventListener('DOMContentLoaded', function() {
    var about = document.getElementById('about');
    var toggleButton = document.querySelector('#key button#about-toggle');
    var closeButton = document.getElementById('close');

    // Function to check if the element is currently visible
    function isElementVisible(element) {
        return window.getComputedStyle(element).display !== 'none';
    }

    // Toggle #about when "?" button is clicked
    toggleButton.addEventListener('click', function() {
        if (isElementVisible(about)) {
            about.style.display = 'none';
        } else {
            about.style.display = 'block';
        }
    });

    // Close #about when the close button is clicked
    closeButton.addEventListener('click', function() {
        about.style.display = 'none';
    });
});








