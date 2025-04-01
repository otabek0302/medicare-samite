// JavaScript for handling hash-based section scrolling
window.addEventListener('DOMContentLoaded', function () {
  const links = document.querySelectorAll('.nav-link, .custom-link-hash');

  // Function to scroll to a section
  function scrollToSection(hash) {
    const targetSection = document.querySelector(hash);
    if (targetSection) {
      // Scroll to the section with a 20px offset
      const topPosition =
        targetSection.getBoundingClientRect().top + window.scrollY - 60;
      window.scrollTo({ top: topPosition, behavior: 'smooth' });
    }
  }

  // Function to update active link styling
  function setActiveLink(hash) {
    links.forEach((link) => {
      if (link.getAttribute('href') === hash) {
        link.classList.add('link-active');
      } else {
        link.classList.remove('link-active');
      }
    });
  }

  // Handle initial hash on page load
  if (window.location.hash) {
    scrollToSection(window.location.hash);
    setActiveLink(window.location.hash);
  }

  // Add click event to all links
  links.forEach((link) => {
    link.addEventListener('click', function (event) {
      const targetHash = this.getAttribute('href');

      // Prevent default anchor behavior
      event.preventDefault();

      // Scroll to the section
      scrollToSection(targetHash);

      // Update the URL hash manually
      history.pushState(null, null, targetHash);

      // Update active link styling
      setActiveLink(targetHash);
    });
  });

  // Listen to scroll events to update the hash based on which section is in view
  window.addEventListener('scroll', function () {
    let currentSection = null;

    // Check all sections to find the one currently in view
    document.querySelectorAll('.content-container').forEach((section) => {
      const sectionTop = section.getBoundingClientRect().top;
      const sectionBottom = section.getBoundingClientRect().bottom;

      // If the section is in view, set it as the current section
      if (sectionTop <= 300 && sectionBottom >= 60) {
        currentSection = section;
      }
    });

    // If we have a section in view, update the URL hash and active link
    if (currentSection) {
      const newHash = '#' + currentSection.id;
      if (window.location.hash !== newHash) {
        history.pushState(null, null, newHash);
        setActiveLink(newHash);
      }
    }
  });
});
