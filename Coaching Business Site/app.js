document.addEventListener('DOMContentLoaded', function () {
  const burger = document.querySelector('.burger');
  const navLinks = document.querySelector('.navbar-links');

  burger.addEventListener('click', function () {
    navLinks.classList.toggle('active');
  });
});
document.addEventListener("DOMContentLoaded", function() {
  document.getElementById('heroContent').style.opacity = 1;
  document.getElementById('heroContent').style.transform = 'translateX(0)';
  document.getElementById('heroImage').style.opacity = 1;
  document.getElementById('heroImage').style.transform = 'scale(1)'; // Scale back to original size
});
// document.addEventListener('scroll', function() {
//   document.querySelectorAll('.service').forEach((elem) => {
//     const rect = elem.getBoundingClientRect();
//     if (rect.top >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)) {
//       elem.classList.remove('separated');
//     } else {
//       elem.classList.add('separated');
//     }
//   });
// });
document.addEventListener('scroll', function() {
  document.querySelectorAll('.service').forEach((elem) => {
    const rect = elem.getBoundingClientRect();
    if (rect.bottom > 0 && rect.top < (window.innerHeight || document.documentElement.clientHeight)) {
      // When any part of the element is visible, remove 'separated' class
      elem.classList.remove('separated');
    } else {
      // When the element is not visible, add 'separated' class
      elem.classList.add('separated');
    }
  });
});
document.addEventListener('scroll', function() {
  const footer = document.querySelector('.site-footer');
  // Determine how close to the bottom of the page the user is
  const scrollPosition = window.scrollY + window.innerHeight;
  const pageHeight = document.documentElement.scrollHeight;
  
  // Determine the threshold for showing the footer. Adjust as necessary.
  const showFooterThreshold = pageHeight - 120; // Show footer 100px before reaching the bottom
  
  if (scrollPosition >= showFooterThreshold) {
    // User is close to the bottom, show the footer
    footer.style.transform = 'translateY(0%)'; // Slide footer up into view
    footer.style.opacity = '1'; // Make footer fully visible
  } else {
    // User is not close to the bottom, hide the footer
    footer.style.transform = 'translateY(100%)'; // Slide footer down out of view
    footer.style.opacity = '0'; // Make footer invisible
  }
});
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('year').textContent = new Date().getFullYear();
});
