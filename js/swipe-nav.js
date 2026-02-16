document.addEventListener('touchstart', handleTouchStart, false);
document.addEventListener('touchmove', handleTouchMove, false);

var xDown = null;
var yDown = null;

function getTouches(evt) {
  return evt.touches ||             // browser API
         evt.originalEvent.touches; // jQuery
}

function handleTouchStart(evt) {
    const firstTouch = getTouches(evt)[0];
    xDown = firstTouch.clientX;
    yDown = firstTouch.clientY;
};

function handleTouchMove(evt) {
    if ( ! xDown || ! yDown ) {
        return;
    }

    var xUp = evt.touches[0].clientX;
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;

    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
        if ( xDiff > 0 ) {
            /* right swipe */
            navigateToNextPage();
        } else {
            /* left swipe */
            navigateToPrevPage();
        }
    }
    /* reset values */
    xDown = null;
    yDown = null;
};

const pageOrder = [
    'index.html',
    'about.html',
    'services.html',
    'activities.html',
    'membership.html',
    'board-members.html',
    'gallery.html',
    'faq.html',
    'contact.html'
];

function navigateToNextPage() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const currentIndex = pageOrder.indexOf(currentPage);
    if (currentIndex !== -1 && currentIndex < pageOrder.length - 1) {
        window.location.href = pageOrder[currentIndex + 1];
    }
}

function navigateToPrevPage() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const currentIndex = pageOrder.indexOf(currentPage);
    if (currentIndex !== -1 && currentIndex > 0) {
        window.location.href = pageOrder[currentIndex - 1];
    }
}
