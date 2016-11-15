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
    
    
    // mobile show filters
    
   $('.show-filters').click(function() {
       console.log('show!');
//           $('#views-exposed-form').show();
    //    $('.views-exposed-form').addClass("shown"); // works
       $('.views-exposed-form').toggle();

   });        

  
    
    
    
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
     if (( $("body").hasClass("large-screen") ) && ( $("body").hasClass("page-calendar")) ) {
        $(document).scroll(function(){ // bind window scroll event
             if( $('#calendar-view-links').is_on_screen() ) {
//                 console.log('u can see topbar');
                $('.left-sidebar-calendar-exposed-filters').removeClass('scrolled'); 
                $('.block-views-large-screen-calendar-block-6').removeClass('scrolled'); 
                $('.block-views-large-screen-calendar-block-7').removeClass('scrolled'); 
                
//                $('.left-sidebar-minimonth').removeClass('scrolled'));
                $('.block-block-11').removeClass('scrolled'); 
            } else {
                
                $('.block-views-large-screen-calendar-block-6').addClass('scrolled');
                
//                $('.left-sidebar-minimonth').addClass('scrolled');
                $('.left-sidebar-calendar-exposed-filters').addClass('scrolled');
  
                $('.block-views-large-screen-calendar-block-6').addClass('scrolled');
                $('.block-views-large-screen-calendar-block-7').addClass('scrolled');

                $('.block-block-11').addClass('scrolled');
//                console.log('you cant see calendar nav links'); 
            }
        });
     }

    
    
    
    
    // page is now ready, initialize the calendar...

  //  jQuery('#calendar').fullCalendar({
        // put your options and callbacks here
   // })
    
    
    // editing or adding event
    
    function calcWeekday() {
        // fetch values
        var m = document.getElementById("edit-field-event-date-und-0-value-month");
        var mid = m.options[m.selectedIndex].value;
        if(mid.length == '1') {
            mid = "".concat("0", mid);
        }
        var d = document.getElementById("edit-field-event-date-und-0-value-day");
        var did = d.options[d.selectedIndex].value;
     
        var y = document.getElementById("edit-field-event-date-und-0-value-year");
        var yid = y.options[y.selectedIndex].value;
        
        var dateString = mid.concat("/", did, "/", yid);
        
        var date = new Date(dateString);
        
        var weekdays = new Array(7);
            weekdays[0]=  "Sunday";
            weekdays[1] = "Monday";
            weekdays[2] = "Tuesday";
            weekdays[3] = "Wednesday";
            weekdays[4] = "Thursday";
            weekdays[5] = "Friday";
            weekdays[6] = "Saturday";
        var wid = date.getDay();                    
        var weekday = weekdays[wid];

        $('head').append('<style>.form-item-field-event-date-und-0-all-day:before{content:"' + weekday + '"; text-transform: uppercase; color: #767676; font-weight: bold; padding: 0px 20px 0px 5px; }</style>');
    }
        

    if (( $("body").hasClass("page-node-add") ) || ( $("body").hasClass("page-node-edit")) ) {
        calcWeekday();
    }
    
    
    $('#edit-field-event-date-und-0-all-day').change(function(){
        var c = this.checked ? 'none' : 'inline';
        $('#edit-field-timezone').css('display', c);
//        var m = this.checked ? '0px' : '32px';
//        $('#edit-field-event-date-und-0-value').css('margin-bottom', m);
       // var p = this.checked ? '0px' : 'inline';
    });
    
//    $('#edit-field-event-date-und-0-show-todate').change(function(){
//        var end = this.checked ? '-200px' : '-91px';
//        $('#edit-field-timezone').css('top', end);
//        
//        if ( $("body").hasClass("large-screen") ){
//            var mobend = $('#edit-field-event-date-und-0-show-todate').checked ? '-164px' : '-71px';
//            $('#edit-field-timezone').css('top', mobend);
//        }
//    });
    $('#edit-field-event-date-und-0-value-month').change(function(){ calcWeekday() });
    $('#edit-field-event-date-und-0-value-day').change(function(){ calcWeekday() });
    $('#edit-field-event-date-und-0-value-year').change(function(){ calcWeekday() });
    
//    .date-no-float.start-date-wrapper.container-inline-date:before {
//        content: "TUESDAY";
//        color: gray;
//        font-weight: bold;
//    }

    // all page

//  jQuery('a.reset').live( 'click', function() {
//    var datafield = jQuery(this).attr('data-field');
//    jQuery('#'+datafield).val('All');
//    jQuery( '#views-exposed-form-large-screen-calendar-block-8' ).submit(funtion(){
//        var tids = [];
//        tids.push([$(input).val()]);                                                                 
//                                                                         
//                                                                         $term = taxonomy_term_load($tid);
//        var name = $term->
//          var termNames =[];
                                                                        
//       var checkedValues = $('input[name="field_event_type_tid[]"]:checked');
//            print_r(checkedValues);
//        });

    // large filters
    $('section.left-sidebar-calendar-exposed-filters form input[type="checkbox"]').change(function() {
	var params = $('section.left-sidebar-calendar-exposed-filters form').serialize();
	$('section.large-calendar-top-navigation a').each(function() {
		var link = $(this).attr('href');
		link = link.replace(/\?.*$/, '');
		$(this).attr('href', link + '?' + params);
	});

    }).change();

// mobile filters    
   $('.view-id-mobile_calendar .view-filters form input[type="checkbox"]').change(function() {
	//$('sdflkjasdflkjad form input[type="checkbox"]:checked').size() 
        var params = $('.view-id-mobile_calendar .view-filters form').serialize();
        $('.calendar-nav-link').each(function() {
                var link = $(this).attr('href');
                link = link.replace(/\?.*$/, '');
                $(this).attr('href', link + '?' + params);
        });

    }).change();
    
    
    
    
    
    
    
});


