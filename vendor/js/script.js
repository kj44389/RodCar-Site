let currentIndex = 0; // global slider position

function getTranslateX(myElement) {
      var style = window.getComputedStyle(myElement); // get style of element -> in our case slider_container
      var matrix = new WebKitCSSMatrix(style.transform); // then get tranform from this style ( we will get vector with matrix values)
      return matrix.m41; // then pick correct one from vector
}

function changeSlide(e) { // change slide by clicking on dot

      if (!e.classList.contains('fa-dot-circle')) { 
            fa_handler = document.querySelectorAll(".fa-circle , .fa-dot-circle") // get all fa elements
            for (let i = 0; i < fa_handler.length; i++) {
                  if (fa_handler[i].classList.contains('fa-dot-circle')) { // clear all selected and change them to not selected
                        fa_handler[i].classList.remove('fa-dot-circle')
                        fa_handler[i].classList.add('fa-circle')
                  }
                  currentIndex = e.dataset.iterator - 1 // set Current Index as iterator form dataset
                  fa_handler[e.dataset.iterator - 1].classList.remove('fa-circle') // clear not selected
                  fa_handler[e.dataset.iterator - 1].classList.add('fa-dot-circle') // and change it to selected
            }
            window.addEventListener('resize', setPositionByIndex(currentIndex)) // on resize change slider transform

      }
}

function changeSlideByIndex() { // change slide by sliding 
      let fa_handler = document.querySelectorAll(".fa-circle , .fa-dot-circle") // get all fa elements
      for (let i = 0; i < fa_handler.length; i++) {
            if (fa_handler[i].classList.contains('fa-dot-circle')) { // clear all selected and change them to not selected
                  fa_handler[i].classList.remove('fa-dot-circle')
                  fa_handler[i].classList.add('fa-circle')

            }
            fa_handler[currentIndex].classList.remove('fa-circle') // clear not selected
            fa_handler[currentIndex].classList.add('fa-dot-circle') // and change it to selected

      }

}

function setPositionByIndex(currentIndex) {
      slideOffsetWidth = document.getElementsByClassName("slide")[0].offsetWidth // get slide width
      setSliderPosition(currentIndex * -slideOffsetWidth) // then multiply its index by negative width -> to move translateX to left we need negative value 
}

function setSliderPosition(currentTranslate) {
      let slider = document.querySelectorAll('.slider_container')[0]; // get slider 
      slider.style.transform = `translateX(${currentTranslate}px)` // then set correct translate value
}

function touchMove(package) {

      // unpacking values from object 

      let e = package['e'];
      let startPosX = package['startPosX'];
      let startPosY = package['startPosY'];
      let slider = package['slider'];
      let canSwipe = package['canSwipe'];
      let translateXValue = package['translateXValue'];

      /////////////////////////////////
      // get first touch 
      let touch = e.touches[0] || e.changedTouches[0];

      // get touch coordinates
      let x = touch.pageX; 
      let y = touch.pageY;
      // get current value of translateX
      let translateX = getTranslateX(slider);

      //get slide and its offsetwidth
      let slides = document.getElementsByClassName("slide");
      let slideOffsetWidth = slides[0].offsetWidth;


      if (x < startPosX // if touch moved on left
            && canSwipe == true // if swipe is not blocked
            && (y < startPosY + 5 && y > startPosY - 5)  // to prevent swiping on top - left direction etc.
            && translateX > -((slides.length - 1) * slideOffsetWidth) // if not greater than slider width
            // && translateX % slideOffsetWidth == 0) 
      )
      { 
            // if translateX modulo slide width is == 0 
            slider.style.transform = `translateX(${translateX - 100}px)` // this starting decrement translateX value to prepare for swipe
            
      }
      else if (x > startPosX  // if touch moved on right
            && canSwipe == true // if swipe is not blocked
            && (y < startPosY + 5&& y > startPosY - 5)   // to prevent swiping on top - left direction etc.
            && translateX < 0  // if not greater than slider width
      )
            // && translateX%slideOffsetWidth ==0) 
      {
            // if translateX modulo slide width is == 0 
            slider.style.transform = `translateX(${translateX + 100}px)` // this starting increment translateX value to prepare for swipe
      }

      // translateX = getTranslateX(slider); // get new translateX value

      if (translateX < translateXValue - 0.5 // scroll to right by pulling to left
                  && canSwipe == true   // if swipe is not blocked
                  && currentIndex != 4 ) { // to prevent swiping to far
            currentIndex += 1; // increment current slide index
            canSwipe = false // block swipe
            setPositionByIndex(currentIndex) // set correct translateX for slideer_container 
            changeSlideByIndex() // change to correct "dot" in paggination div
      }
      else if (translateX > translateXValue + 0.5 // scroll to left by pulling to right
                  && canSwipe == true // if swipe is not blocked
                  && currentIndex != 0) {  // to prevent swiping to far
            
            currentIndex -= 1; // decrement current slide index
            canSwipe = false // block swipe
            setPositionByIndex(currentIndex) // set correct translateX for slideer_container 
            changeSlideByIndex() // change to correct "dot" in paggination div
      }

      return canSwipe // return current state of canSwipe

}

let onLoad = () => {
      // Add map to site 
      var mymap = L.map('mapid').setView([53.530528, 15.802581], 50); // set correct coordinates
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(mymap);

      L.marker([53.530528, 15.802581]).addTo(mymap) // add marker
            .bindPopup('RodCar - Warsztat Samochodowy') // add marker title
            .openPopup(); // open marker

      // add Event Listener to open google maps with address after clicking
      document.getElementById('mapid').addEventListener('click', () => { // when map is clicked open google maps with those coordinates
            window.open('https://goo.gl/maps/rB5gsHQfuFx5MDNM8'); 
      })


      // initiate for slider purpose
      const slider = document.getElementsByClassName('slider_container')[0]; // get slider div
      let slides = Array.from(document.getElementsByClassName('slide')); // get all slides
      let pagination = document.getElementsByClassName('slider_pagination')[0] // get pagination div

      // initiate values
      let startPosX = 0;
      let startPosY = 0;
      let translateXValue = 0;
      let canSwipe = true;

      slides.forEach(slide => {

            slide.addEventListener('touchstart', function (e) { 

                  let touch = e.touches[0] || e.changedTouches[0]; // first touch
                  // get touch coordinates and set them as starting values
                  startPosX = touch.pageX;
                  startPosY = touch.pageY;
                  translateXValue = getTranslateX(slider);
                  canSwipe = true;

            }, false)

            slide.addEventListener('touchmove', function (e) {
                  // get all needed stuff to object to pass them easy to function
                  let package = {
                        'startPosX': startPosX,
                        'startPosY': startPosY,
                        'translateXValue': translateXValue,
                        'canSwipe': canSwipe,
                        'slide': slide,
                        'e': e,
                        'slider': slider,
                  }
                  canSwipe = touchMove(package)

            }, false)

            slide.addEventListener('touchend', function (e) {
                  canSwipe = true;

            }, false)


      });

      for (let i = 0; i < slides.length; i++) { // generate pagination dots
            let child = pagination.appendChild(document.createElement("i")) 
            child.dataset.iterator = i + 1 // set iterator
            child.classList.add('fas') // add fontawesome class
            if (i === 0) child.classList.add('fa-dot-circle') // set first dot as selected
            else child.classList.add('fa-circle')
            child.setAttribute('onclick', "changeSlide(this)") // set onclick event on created icon
      }
}
