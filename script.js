document.addEventListener('DOMContentLoaded', function() {
    const apiKey = '4BxKRdFo8rOTDaS7aXggzYVzxrSbiXqospmMOTAF'; // Utiliza tu propia clave API
    const fetchImageBtn = document.getElementById('fetchImageBtn');
    const datePicker = document.getElementById('datePicker');
    const title = document.getElementById('title');
    const date = document.getElementById('date');
    const explanation = document.getElementById('explanation');
    const mediaContainer = document.getElementById('media-container');

    fetchImageBtn.addEventListener('click', function() {
        const selectedDate = datePicker.value;
        if (selectedDate) {
            fetchImageForDate(selectedDate);
        } else {
            alert('Por favor, selecciona una fecha.');
        }
    });

    function fetchImageForDate(date) {
        const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${date}`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                title.textContent = data.title;
                date.textContent = `Fecha: ${data.date}`;
                explanation.textContent = data.explanation;
                mediaContainer.innerHTML = ''; // Clear previous content

                if (data.media_type === 'video') {
                    const iframe = document.createElement('iframe');
                    iframe.src = data.url;
                    iframe.setAttribute('frameborder', '0');
                    iframe.setAttribute('allowfullscreen', 'true');
                    iframe.style.width = '100%';
                    iframe.style.height = '500px'; // Altura fija para el iframe del video
                    mediaContainer.appendChild(iframe);
                } else if (data.media_type === 'image') {
                    const image = document.createElement('img');
                    image.src = data.url;
                    image.alt = data.title;
                    mediaContainer.appendChild(image);
                }
            })
            .catch(error => {
                console.error('Error fetching APOD data:', error);
            });
    }

    // Fetch the image for the current date on load
    const today = new Date().toISOString().split('T')[0];
    fetchImageForDate(today);
});
