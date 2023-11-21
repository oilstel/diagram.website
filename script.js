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



document.getElementById('submission-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(this);
    const formObject = {};
    formData.forEach((value, key) => { formObject[key] = value; });

    var submissionForm = document.getElementById('submission-form');

    fetch('https://script.google.com/macros/s/AKfycbw8mTkZnE0cobdz5odWwulUGqwSsU9OyiC8lukoI7ne-HsSZRXULaKiBIVf45uOresMVQ/exec', {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(formObject).toString()
    }).then(response => {
        console.log('Form submitted');
        submissionForm.innerHTML = `<p>Thank you for your submission.</p>`
        // Handle success
    }).catch(error => {
        console.error('Error submitting form', error);
        // Handle error
    });
});


// Load initial SVG (evening) on page load
document.addEventListener('DOMContentLoaded', function() {
    loadSvg('evening');
    document.body.classList.add('evening');
});

// Function to center the SVG on the page
function centerSvg() {
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
}

// Function to load SVGs
function loadSvg(theme) {
    fetch(`images/diagram-${theme}.svg`)
        .then(response => response.text())
        .then(svgContent => {
            const themeContainer = document.getElementById('diagrams');
            themeContainer.innerHTML = svgContent;

            centerSvg();
        })
        .catch(error => console.error('Error loading SVG:', error));
}

// Event listener for theme toggle
document.getElementById('theme-toggle').addEventListener('click', function() {
    const themes = ['evening', 'day', 'expressive'];
    const currentTheme = document.getElementById('diagrams').getAttribute('data-current-theme');
    const currentThemeIndex = themes.indexOf(currentTheme);

    // Determine the next theme
    const nextThemeIndex = (currentThemeIndex + 1) % themes.length;
    const nextTheme = themes[nextThemeIndex];

    // Load and display the next theme SVG
    loadSvg(nextTheme);

    // Update current theme data attribute, body class, and button text
    document.getElementById('diagrams').setAttribute('data-current-theme', nextTheme);
    updateBodyClass(nextTheme, themes);
    updateButtonText(nextTheme);
});

// Function to update body class
function updateBodyClass(newTheme, themes) {
    themes.forEach(theme => document.body.classList.remove(theme));
    document.body.classList.add(newTheme);
}

// Function to update button text with current theme
function updateButtonText(theme) {
    const themeToggleButton = document.getElementById('theme-toggle');
    themeToggleButton.textContent = `theme: ${theme}`;
}

// Load initial SVG (evening) on page load
document.addEventListener('DOMContentLoaded', function() {
    const initialTheme = 'evening';
    loadSvg(initialTheme);
    document.body.classList.add(initialTheme);
    updateButtonText(initialTheme); // Set initial button text
});











