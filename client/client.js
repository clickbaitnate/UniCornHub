console.log('Hello World!');

const form = document.querySelector('form');
const loadingElement = document.querySelector('.loading');
const nweetsElement = document.querySelector('.nweets')
const API_URL = 'http://localhost:5000/nweets';

loadingElement.style.display = '';

listAllNweets();

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const name = formData.get('name');
    const content = formData.get('content');

    const nweet = {
        name,
        content
    };

    form.style.display = 'none';
    loadingElement.style.display = '';

    fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify(nweet),
        headers: {
            'content-type': 'application/json'
        }
    }).then(response => response.json())
      .then(createdNweet => {
          form.reset();
          setTimeout(() => {
            form.style.display = '';
          }, 30000);
          listAllNweets();
     });
});

function listAllNweets() {
    nweetsElement.innerHTML = '';
    fetch(API_URL)
    .then(response => response.json())
    .then(nweets => {
      console.log(nweets);
      nweets.reverse();
      nweets.forEach(nweet => {
        const div = document.createElement('div');

        const header = document.createElement('h3');
        header.textContent = nweet.name;

        const contents = document.createElement('p');
        contents.textContent = nweet.content;

        const date = document.createElement('small');
        date.textContent = new Date(nweet.created);

        div.appendChild(header);
        div.appendChild(contents);
        div.appendChild(date);

        nweetsElement.appendChild(div);
      });
      loadingElement.style.display = 'none';
    });
}
