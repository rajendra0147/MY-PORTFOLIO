
// Smooth scrolling for navigation links
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({
            behavior: 'smooth'
        });
    });
});

document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);
    const formMessage = document.getElementById('form-message');

    fetch(form.action, {
        method: form.method,
        body: JSON.stringify(Object.fromEntries(formData)),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => response.json())
      .then(data => {
          if (data.error) {
              formMessage.textContent = data.error;
              formMessage.style.color = 'red';
          } else {
              formMessage.textContent = data.message;
              formMessage.style.color = 'green';
              form.reset();
          }
          formMessage.style.display = 'block';
          
          // Hide the message after 5 seconds
          setTimeout(() => {
              formMessage.style.display = 'none';
          }, 5000);
      }).catch(error => {
          formMessage.textContent = 'An error occurred. Please try again.';
          formMessage.style.color = 'red';
          formMessage.style.display = 'block';
          
          // Hide the message after 5 seconds
          setTimeout(() => {
              formMessage.style.display = 'none';
          }, 5000);
      });
});
