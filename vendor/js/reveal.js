window.sr = ScrollReveal();
var onReady = function(){
      var tid = setInterval( function () {
      if ( document.readyState !== 'complete' ) return;
            clearInterval( tid );      
            var nodeList = document.querySelectorAll('.info_section , .info_with_image')


            ScrollReveal().clean(nodeList);
            

            if(document.title === 'RodCar'){
                  ScrollReveal().reveal(nodeList[0], { delay: 300, interval: 200, distance: '150px', origin: 'top'});
                  ScrollReveal().reveal(nodeList[1], { delay: 400, interval: 200, distance: '50px', origin: 'right' });
                  ScrollReveal().reveal(nodeList[2], { delay: 200, interval: 200, distance: '50px', origin: 'bottom' });
                  ScrollReveal().reveal(nodeList[3], { delay: 300, interval: 200, distance: '50px', origin: 'left' });
                  ScrollReveal().reveal(nodeList[8], { delay: 300, interval: 200, distance: '50px', origin: 'left' });
                  ScrollReveal().reveal(nodeList[9], { delay: 300, interval: 200, distance: '50px', origin: 'left' });

            }
            else{
                  ScrollReveal().reveal(nodeList, { delay: 200, interval: 200, distance: '50px', origin: 'bottom' });
            }
            
      }, 100 );
     
}
onReady();
