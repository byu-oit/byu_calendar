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
    
    //  --- large screen left side filters --- 
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
                if( $('#content-footer').is_on_screen() ){
					// footer showing, unset scrolled class so it doesn't run into footer
					$('.left-sidebar-calendar-exposed-filters').removeClass('scrolled'); 
					$('.block-views-large-screen-calendar-block-6').removeClass('scrolled'); 
					$('.block-views-large-screen-calendar-block-7').removeClass('scrolled'); 
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
            }
        });
     }

	// getting today's date info
	function pad(n) {
		return (n < 10) ? ("0" + n) : n;
	}
	var dash = '-';
	var date = new Date();
	var y = date.getFullYear();

	var yearNow = y.toString();
	console.log(yearNow);
	var d = date.getDate();
	// add leading zero to day
	d = pad(d);
	var dayNow = d.toString();

	var m = date.getMonth()+1;
	// add leading zero to month
	m = pad(m);
	monthNow = m.toString();

	var realDate = yearNow.concat(dash,monthNow,dash,dayNow);
	// calculate current week...

	var startString = yearNow + "-01-01";
	var yearStartDate = new Date(startString);
	console.log("year starts: " . yearStartDate);
	var yearStartWeekday = yearStartDate.getDay();
	console.log('year starts on weekday: ');
	console.log(yearStartWeekday); // is a 0-6



	//var realWeek = yearNow.concat(dash,monthNow,dash,dayNow);
	var realMonth = yearNow.concat(dash,monthNow);

	
	// checking if TODAY / WEEK / MONTH in menu are actually today / this week / this month
    if (( $("body").hasClass("large-screen") ) && ( $("body").hasClass("page-calendar-day")) ) {
			var navDayId = $(".calendar-nav-item.current-day").attr( "id");
		//console.log(navDayId);
		//console.log(' and ');
		//console.log(realDate);
		if(navDayId != realDate){
			// remove active class from menu link
			$('#main-menu li.active').removeClass('active');
			$('#main-menu a.active').removeClass('active');
			//console.log('isnt today');
		}
	}
	if (( $("body").hasClass("large-screen") ) && ( $("body").hasClass("page-calendar-week")) ) {
		// check if calendar-nav-item has class current-day, (also add day format to this link for day, etc), check if  matches today

		var pathArr = window.location.pathname.split('/');
		var pathSize = pathArr.length -1;
		var last =pathArr[pathSize];
		console.log(last);
		if (last != 'week'){
			// last is the date with week id, get last 2 digits for week id
			if(last != realWeek) {
				$('#main-menu li.active').removeClass('active');
				$('#main-menu a.active').removeClass('active');
			}
		}

	}
	if (( $("body").hasClass("large-screen") ) && ( $("body").hasClass("page-calendar-month")) ) {
		// check if calendar-nav-item has class current-day, (also add day format to this link for day, etc), check if  matches today
		var navMonthId = $(".calendar-nav-item.current-month").attr( "id");
		//console.log(navMonthId);
		//console.log(' and ');
		//console.log(realMonth);
		if(navMonthId != realMonth){
			// remove active class from menu link
			$('#main-menu li.active').removeClass('active');
			$('#main-menu a.active').removeClass('active');
		}
	}
	//----- end checking active classes

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

        $('head').append('<style>.form-item-field-event-date-und-0-all-day:before{content:"' + weekday + '"; text-transform: uppercase; color: #767676; font-weight: bold; padding: 0px 5px 0px 5px; }</style>');
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

    
    // mobile show filters
    
   $('#main-content-section').on('click', '.show-filters', function() {
       console.log('show!');
//           $('#views-exposed-form').show();
        $('.views-exposed-form').addClass("shown"); // works
        $('.close-filters').addClass("shown");
      // $('.views-exposed-form').toggle();
  
   });        
    // close
     $('#main-content-section').on('click', '.close-filters', function() {
         $('.views-exposed-form').removeClass("shown"); // works
         $('.close-filters').removeClass("shown");
     });
    
    function checkMobileFilters (){
        var mobileParams = $('section .view-mobile-calendar .view-filters form').serialize();
        // if we enable this filter adding to links, it breaks the #anchor to day of the week funcitonality, which is more important, but week filters will be remembered
//        $('.thin-left-sidebar a').each(function() {
//            var mlink = $(this).attr('href');
//            mlink = mlink.replace(/\?.*$/, '');
//            $(this).attr('href', mlink + '?' + mobileParams);
//        });
        //console.log(mobileParams);           
        // mobile theme filters link if being filtered currently
        if(mobileParams != 'field_tags_tid='){
            $('.show-filters').addClass('filtering');
        }
    }
    checkMobileFilters(); // check on page load
    
    (function ($) {
        Drupal.behaviors.betterExposedFilters = {
        attach: function(context) {         
                //console.log('better exposed filters!'); // hits this function twice each submit
                $('.close-filters').removeClass("shown");
                checkMobileFilters();
        }}
})(jQuery);
    


    
    
    // large filters
    $('section.left-sidebar-calendar-exposed-filters form input[type="checkbox"]').change(function() {
	var params = $('section.left-sidebar-calendar-exposed-filters form').serialize();
	$('section.large-calendar-top-navigation a').each(function() {
		var link = $(this).attr('href');
		link = link.replace(/\?.*$/, '');
		$(this).attr('href', link + '?' + params);
	});
        // on All page, set title
       //params is like '?field_event_type_tid%5B%5D=3&field_event_type_tid%5B%5D=4&field_tags_tid=All';
     var terms = params.replace(/field_event_type_tid%5B%5D=|field_tags_tid=All|All|field_tags_tid=/gi,'');
//        terms = terms.replace('field_tags_tid=','');
        terms = terms.replace(/&/gi,', ');
        
         terms = terms.replace(/, ALL/,'');
        console.log(terms);
        var ids = terms.split(', ');
        
        
        //var termNames =
        
//        var chars = terms.split('');
//        terms = chars.join(',');
//        console.log(terms);
        
       // document.getElementById("calendar-all-filter-title").innerHTML=terms; 
        
        
    }).change();

// mobile filters   - off because it breaks links with # which is main week & month navigation  
//   $('.view-id-mobile_calendar .view-filters form input[type="checkbox"]').change(function() {
//	//$('sdflkjasdflkjad form input[type="checkbox"]:checked').size() 
//        var params = $('.view-id-mobile_calendar .view-filters form').serialize();
//        $('.thin-left-sidebar a').each(function() {
//                var link = $(this).attr('href');
//                link = link.replace(/\?.*$/, '');
//                $(this).attr('href', link + '?' + params);
//        });
//
//    }).change();
//    
    
	
    // load for homepage for select date dropdown:
	
	
	var selected = 1;
//add listeners for selected values
function update(date) {
	//var date = new Date();
	var month = date.getMonth();
	var year = date.getFullYear();
	var days = new Date(year, month+1, 0).getDate();
	
	//reset list of day numbers
	$("#day").html("");
	for (var i =1;i < days+1;i++) {
		$("#day").append("<option value=\"" + i + "\" id=\"day"+ i +"\">" + i + "</option>");
	}
	//keep selected day, unless too big for this month.
	$("#day"+days).attr("selected","selected");
	$("#day"+selected).attr("selected","selected");
	if (selected > days) {
		selected = days;
	}
	$("#month"+month).attr("selected","selected");
	$("#mon"+month).attr("selected","selected");
}

function updateByMonth(month) {
	//number of days in the month
		var days = new Date($("#year").val(), month, 0).getDate();
		var date = new Date();
		//check if current day is too big
		if (days < $("#day").val()) {
			date = new Date(+$("#year").val() +"-"
					+("0"+month).slice(-2) +"-"
					+days);
		}
		else {
			date = new Date(+$("#year").val() +"-"
					+("0"+month).slice(-2) +"-"
					+$("#day").val());
		}
		update(date);
}

function startListeners() {
	//update when month is changed
	$("#month").change(function () {
		updateByMonth($("#month").val());
	});
	$("#mon").change(function () {
		updateByMonth($("#mon").val());
	});
	//update when year is changed
	$("#year").change(function () {
		update(new Date(+$("#year").val() +"-"
		+("0"+$("#month").val()).slice(-2) +"-"
		+$("#day").val()));
	});
	//keep track of current day selected
	$("#day").change(function () {
		selected = $("#day").val();
	});
}

//$(document).ready(function() {
	//hide month based on screen size
	if ($('.large-screen').length > 0) {
		$("#mon").css("display","none");
	}
	else if ($('.mobile-first').length > 0) {
		$("#month").css("display","none");
	}
	else {
		$("#mon").css("display","none");
	}
	
	//initialize values
	var date = new Date();
	var month = date.getMonth();
	var year = date.getFullYear();
	var day = date.getDate();
	
	update(new Date());
	$("#day"+day).attr("selected","selected");
	selected = day;
	
	//set two values for year
	var nextyear = parseInt(year,10)+1;
	$("#year").append("<option value=\"" + year + "\" id=\"year"+ year +"\">" + year + "</option>");
	$("#year").append("<option value=\"" + nextyear + "\" id=\"year"+ nextyear +"\">" + nextyear + "</option>");
	
	//select current month
	$("#month"+month).attr("selected","selected");
	$("#mon"+month).attr("selected","selected");

	//on click redirect page
	$("#go").click(function() {
		var link = "../calendar/day/"
		+$("#year").val() +"-"
		+("0"+$("#month").val()).slice(-2) +"-"
		+$("#day").val()
		;
		window.location.href = link;
		//or for no back button use this:
		//window.location.replace(link);
	});

	startListeners();
	
//});
    
    
    
    
});


