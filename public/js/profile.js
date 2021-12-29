const Returntohome = async (event) => {
    event.preventDefault();

    const description = document.querySelector('#description').value.trim();
    const postname = document.querySelector('#project-name').value.trim();
    const image = document.querySelector('#post-image').value.trim();
    if (image && postname && description) {
        // Send a POST request to the API endpoint
        const response = await fetch('/profile', {
          method: 'POST', 
          body: JSON.stringify({ image, postname, description }),
          headers: { 'Content-Type': 'application/json' },
        });
    
        if (response.ok) {
          // If successful, redirect the browser to the profile page
          document.location.replace('/');
          console.log('it worked')
        } else {
          alert(response.statusText);
        }
      }
}

document.querySelector('.btn').addEventListener('submit', Returntohome)