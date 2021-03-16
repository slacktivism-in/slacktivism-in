let events = [];
fetch('events.json')
    .then(function (response) {
        return response.json()
    })
    .then(function (response) {
        events = response.events
        updateEvents();
    })
    .catch(function (err) {
        console.log(err);
    });

let updateEvents = function () {
    let eventDiv = document.getElementById('events');
    events.map(event => {
        eventDiv.insertAdjacentHTML('afterbegin', `<div class="event">
            <h4>${event.title}</h4>
            <span>Timing: ${event.date} ${event.time}</span>
            <br/>
            <span>
            Location: <a target="_blank" href="${event.gmap_link}">
            ${event.location}
            </a>
            </span>
            <br/>
            <span>Message: ${event.message}</span>
            <br/>
        </div>`)
    });
}

function openCloseMenu(hash) {
    let menuElement = document.getElementById('menu');
    if (menuElement.classList.contains('slide-out') || !menuElement.classList.contains('slide-in')) {
        document.getElementsByTagName('body')[0].classList.remove('overflow-hidden')
        menuElement.classList.remove('slide-out');
        menuElement.classList.add('slide-in');
        setTimeout(() => {
            menuElement.classList.add('d-none');
        }, 500);
    } else {
        document.getElementsByTagName('body')[0].classList.add('overflow-hidden')
        menuElement.classList.remove('slide-in');
        menuElement.classList.add('slide-out');
        menuElement.classList.remove('d-none');
    }
    if (hash) {
        window.location.hash = hash;
    }
}