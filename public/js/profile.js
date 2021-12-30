const Returntohome = async (event) => {
    event.preventDefault();
console.log('submitform')
    const description = document.querySelector('#description').value.trim();
    const postname = document.querySelector('#project-name').value.trim();
    const image = document.querySelector('#post-image').value.trim();
    if (image && postname && description) {
        // Send a POST request to the API endpoint
        const response = await fetch('/api/posts/profile', {
          method: 'POST', 
          body: JSON.stringify({ image, name:postname, description }),
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
console.log(document.querySelector('#formpost'))
document.querySelector('#formpost').addEventListener('submit', Returntohome)