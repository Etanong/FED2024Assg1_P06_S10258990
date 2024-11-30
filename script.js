
  document.addEventListener('DOMContentLoaded', () => {
    const reviewsContainer = document.querySelector('.container'); // Main container
    const addReviewButton = document.querySelector('.add-review button'); // Button to open the review form

    // Function to generate stars based on rating
    const createStars = (rating) => {
      return '★'.repeat(rating) + '☆'.repeat(5 - rating);
    };

    // Function to add a new review dynamically
    const addReview = (name, stars, comment) => {
      const reviewDiv = document.createElement('div');
      reviewDiv.classList.add('review');

      reviewDiv.innerHTML = `
        <div class="review-header">
          <h4>${name}</h4>
          <div class="stars">${createStars(stars)}</div>
        </div>
        <div class="review-body">
          <p>${comment}</p>
        </div>
      `;

      // Insert the new review above the "Add Your Review" button
      const addReviewDiv = document.querySelector('.add-review');
      reviewsContainer.insertBefore(reviewDiv, addReviewDiv);
    };

    // Function to display the review form
    const showReviewForm = () => {
      // Check if form already exists
      if (document.querySelector('.review-form')) {
        alert('The form is already open!');
        return;
      }

      // Create the form dynamically
      const formDiv = document.createElement('div');
      formDiv.classList.add('review-form');
      formDiv.innerHTML = `
        <h3>Submit Your Review</h3>
        <form id="review-form">
          <label for="name">Name:</label>
          <input type="text" id="name" placeholder="Your name" required /><br><br>
          <label for="stars">Rating (1-5):</label>
          <input type="number" id="stars" min="1" max="5" required /><br><br>
          <label for="comment">Comment:</label>
          <textarea id="comment" placeholder="Write your review..." required></textarea><br><br>
          <button type="submit">Submit</button>
          <button type="button" id="cancel-button">Cancel</button>
        </form>
      `;

      // Append the form to the container
      reviewsContainer.appendChild(formDiv);

      // Handle form submission
      const form = document.getElementById('review-form');
      form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form values
        const name = document.getElementById('name').value.trim();
        const stars = parseInt(document.getElementById('stars').value.trim());
        const comment = document.getElementById('comment').value.trim();

        // Validate inputs
        if (!name || !stars || stars < 1 || stars > 5 || !comment) {
          alert('Please fill out all fields and give a rating between 1 and 5.');
          return;
        }

        // Add the new review
        addReview(name, stars, comment);

        // Remove the form after submission
        formDiv.remove();
      });

      // Handle form cancellation
      const cancelButton = document.getElementById('cancel-button');
      cancelButton.addEventListener('click', () => {
        formDiv.remove();
      });
    };

    // Attach event listener to "Add Your Review" button
    addReviewButton.addEventListener('click', showReviewForm);
  });

