const apiKey = 'pub_69525c5c19767a922b4c4a3eb449abb3bc424';
const defaultImage = 'https://thumbs.dreamstime.com/b/news-newspapers-folded-stacked-word-wooden-block-puzzle-dice-concept-newspaper-media-press-release-42301371.jpg'; // URL of the default image

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('country-select').addEventListener('change', fetchNews);
    document.getElementById('category-select').addEventListener('change', fetchNews);

    fetchNews(); // Fetch the default category (Business) and country (India) on page load
});

function fetchNews() {
    const country = document.getElementById('country-select').value;
    const category = document.getElementById('category-select').value;
    const url = `https://newsdata.io/api/1/news?apikey=${apiKey}&country=${country}&category=${category}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data); // Log the fetched news data
            const newsTableBody = document.querySelector('#news-table tbody');
            newsTableBody.innerHTML = ''; // Clear previous news articles

            data.results.forEach(article => {
                if (article.description) { // Check if description is not null
                    const row = document.createElement('tr');

                    const imageCell = document.createElement('td');
                    const image = document.createElement('img');
                    image.src = article.image_url || defaultImage; // Use default image if article image is not available
                    image.alt = 'Article image';
                    image.classList.add('news-image');
                    imageCell.appendChild(image);

                    const detailsCell = document.createElement('td');

                    const title = document.createElement('h2');
                    title.textContent = article.title;

                    const publishedDate = new Date(article.pubDate);
                    const date = document.createElement('p');
                    if (!isNaN(publishedDate)) {
                        date.innerHTML = `<i>${publishedDate.toLocaleString()}</i>`;
                        date.classList.add('date-style'); 

                    } else {
                        date.innerHTML = '<i>No date found</i>';
                    }

                    const description = document.createElement('p');
                    const wordLimit = 100;
                    const descriptionWords = article.description.split(' ');
                    const truncatedDescription = descriptionWords.slice(0, wordLimit).join(' ');
                    const moreDescription = descriptionWords.length > wordLimit ? `<span class="more-description">${descriptionWords.slice(wordLimit).join(' ')}</span>` : '';

                    if (descriptionWords.length > wordLimit) {
                        description.innerHTML = `${truncatedDescription} <span class="more-description-toggle">...Read more</span>${moreDescription}`;
                    } else {
                        description.textContent = article.description;
                    }

                    const link = document.createElement('a');
                    link.href = article.link;
                    link.textContent = 'Read full article';
                    link.target = '_blank';

                    detailsCell.appendChild(title);
                    detailsCell.appendChild(date);
                    detailsCell.appendChild(description);
                    detailsCell.appendChild(link);

                    row.appendChild(imageCell);
                    row.appendChild(detailsCell);

                    newsTableBody.appendChild(row);
                }
            });

            document.querySelectorAll('.more-description-toggle').forEach(toggle => {
                toggle.addEventListener('click', function() {
                    const moreDescription = this.nextElementSibling;
                    if (moreDescription.style.display === 'none' || !moreDescription.style.display) {
                        moreDescription.style.display = 'inline';
                        this.style.display = 'none';
                    }
                });
            });
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}
