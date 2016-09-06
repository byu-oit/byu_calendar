jQuery.noConflict();





jQuery( document ).ready(function( $ ) {
    $("#large-calendar-nav-container").delay(4000).fadeIn(500);
  // Code that uses jQuery's $ can follow here.
    $.fn.is_on_screen = function(){
        var win = $(window);
        var viewport = {
            top : win.scrollTop(),
            left : win.scrollLeft()
        };
        viewport.right = viewport.left + win.width();
        viewport.bottom = viewport.top + win.height();

        var bounds = this.offset();
        bounds.right = bounds.left + this.outerWidth();
        bounds.bottom = bounds.top + this.outerHeight();

        return (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom));
    };
    
    
    
    
    
    
    //for Calendar mobile year view
    if ($("body").hasClass("mobile-first-calendar-yearview")) {
        //alert('this is an alert');

        
        $("body").on("scrollstart",function(){
          //alert("Started scrolling!");
        });
        
        $(document).scroll(function(){ // bind window scroll event
             //alert("Started scrolling!");

            // 1. 
            if( $('#July').is_on_screen() || $('#August').is_on_screen() || $('#September').is_on_screen() || $('#October').is_on_screen() || $('#November').is_on_screen() || $('#December').is_on_screen() ) { // if target element is visible on screen after DOM loaded           
                //alert('function worked');
                $('.calendar-nav-section.part-1').addClass('hidden');
                $('.calendar-nav-section.part-2').removeClass('hidden');
                $('a.part-1').addClass('hidden');
                $('a.part-2').removeClass('hidden');
                console.log('it is part 2 on screen'); 
            } else {
               // alert('i can NOT see it');
                $('.calendar-nav-section.part-1').removeClass('hidden');
                $('.calendar-nav-section.part-2').addClass('hidden');
                $('a.part-1').removeClass('hidden');
                $('a.part-2').addClass('hidden');
                console.log('it is part 1 on screen');
            }

            // 2.   
   /*         var height = $(document).height();
            var scrollTop = $(window).scrollTop(); 
            console.log(scrollTop);
            if(scrollTop > 100) {
                $("#main-content-section").addClass('scrolled');
            } else {
                $("#main-content-section").removeClass('scrolled');
            }
            */
            
        });
        
    
        
    }  // - end mobile year view
    
    //  --- large screen week view --- 
     if ( $("body").hasClass("large-screen-calendar-weekview") ) {
        $(document).scroll(function(){ // bind window scroll event
             if( $('.top-bar').is_on_screen() ) {
//                 console.log('u can see topbar');
                $('#views-exposed-form-large-screen-calendar-block-3').removeClass('scrolled'); 
                $('.block-views-large-screen-calendar-block-6').removeClass('scrolled'); 
                $('.block-block-11').removeClass('scrolled'); 
            } else {
                $('#views-exposed-form-large-screen-calendar-block-3').addClass('scrolled');
                $('.block-views-large-screen-calendar-block-6').addClass('scrolled');
                $('.block-block-11').addClass('scrolled');
//                console.log('you cant see top bar'); 
            }
        });
     }

    
    
    
    
    // page is now ready, initialize the calendar...

  //  jQuery('#calendar').fullCalendar({
        // put your options and callbacks here
   // })
    
    
    
    
});


