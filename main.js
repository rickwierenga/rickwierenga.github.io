/* cards */
$('.flip').click(function(){
    if ($(this).find('.card').hasClass('flipped')) {
        $(this).find('.card').removeClass('flipped');
    } else {
        $(this).find('.card').addClass('flipped');
    }
    return true;
});

/* smooth scrolling */
$(document).ready(function(){
    /* source: w3schools 
    * https://www.w3schools.com/howto/howto_css_smooth_scroll.asp 
    */

    $("a").on('click', function(event) {
        if (this.hash !== "") {
            event.preventDefault();
            var hash = this.hash;
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, {
                duration: 1000, 
                easing: 'linear'
            }, function(){
                window.location.hash = hash;
            });
        }
    });
});