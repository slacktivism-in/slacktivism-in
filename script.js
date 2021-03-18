let events = [];
let images = [];
let slideIndex = 1;

function plusDivs(n) {
    showDivs(slideIndex += n);
}

setInterval(() => {
    plusDivs(1)
}, 5000)

function showDivs(n) {
    let i;
    let x = document.getElementsByClassName("mySlides");
    if (n > x.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = x.length }
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    x[slideIndex - 1].style.display = "block";
}

fetch('carousel-images.json')
    .then(function (response) {
        return response.json()
    })
    .then(function (response) {
        images = response.images
        updateCarousel();
        showDivs(slideIndex);
    })
    .catch(function (err) {
        console.log(err);
    });


let updateCarousel = function () {
    let carouselDiv = document.getElementById('carousel');
    images.map(image => {
        carouselDiv.insertAdjacentHTML('afterbegin', `
        <div class="w3-display-container mySlides">
        <img class="carousel-image" src="${image.src}" style="width:  100%;
        height: 640px;
        object-fit: cover;">
      </div>
        `)
    });
}

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
        document.getElementsByTagName('html')[0].classList.remove('overflow-hidden')
        menuElement.classList.remove('slide-out');
        menuElement.classList.add('slide-in');
        setTimeout(() => {
            menuElement.classList.add('d-none');
        }, 500);
    } else {
        document.getElementsByTagName('body')[0].classList.add('overflow-hidden')
        document.getElementsByTagName('html')[0].classList.add('overflow-hidden')
        menuElement.classList.remove('slide-in');
        menuElement.classList.add('slide-out');
        menuElement.classList.remove('d-none');
    }
    if (hash) {
        window.location.hash = hash;
    }
}
