jQuery.noConflict();





jQuery( document ).ready(function( $ ) {
	
	var pathArr = window.location.pathname.split('/');
	var pathSize = pathArr.length -1;
	var last =pathArr[pathSize];
//		console.log(last);
	
	// getting today's date info
	function pad(n) {
		return (n < 10) ? ("0" + n) : n;
	}
	var dash = '-';
	var date = new Date();
	var timeNow = date.getTime();
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
	var monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
	if(m == 1){
		// is currently january, link to top
		var lastMonthName = "";
	} else {
		var lastMonthId = date.getMonth() -1;
//		lastMonthId = lastMonthId < 0 ?  : lastMonthId;
		var lastMonthName = monthNames[lastMonthId];
	}
	
	
	var monthNowName = monthNames[date.getMonth()];
	
//	var locale = "en-us";
	
//    var monthNowName = date.toLocaleString(locale, { month: "long" });
	

	var realDate = yearNow.concat(dash,monthNow,dash,dayNow);

	//var realWeek = yearNow.concat(dash,monthNow,dash,dayNow);
	var realMonth = yearNow.concat(dash,monthNow);
	/* -- end getting today's date info --- */
	
	
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
    
    

  // handle mobile left sidebar positioning
	if ($("body").hasClass("mobile-first")) {	
		$(window).scroll(function(e){ 
			var top = $('#sidebar-first-container').offset().top - $(document).scrollTop();
			var mainTop = $('main').offset().top - $(document).scrollTop();
			
			// see if scrolled to end of content yet:
			var mainHeight = $('#main-content-section').innerHeight(); // inner height of the element
		
			var offset = $('#byu-footer').offset().top;
			//  for non ios browsers
			var amountScrolled = $(document).scrollTop()
			// for ios 
			
			
			var total = offset + amountScrolled + 170;
//			console.log('total is');
//			console.log(total);
			if(total >= mainHeight) {  // if right at the end of main container or past into the footer
				$('aside.columns.sidebar-first').removeClass('scrolled');
//				console.log('footer is shown');
			} else {
//				console.log('footer is NOT shown');
			// for admins mobile
				if($("body").hasClass("adminimal-menu")) {	
					if (top < 47 ) {
						$('aside.columns.sidebar-first').addClass('scrolled');
	//					$('aside.columns.sidebar-first').css('position', 'fixed');
	//					$('aside.columns.sidebar-first').css('top', '47px');

					} else if( mainTop >= 0 ) {
						$('aside.columns.sidebar-first').removeClass('scrolled');
	//					$('aside.columns.sidebar-first').css('position', 'relative');
	//					$('aside.columns.sidebar-first').css('top', '0px');
	//					console.log('testing main small space was:');
	//					console.log(mainTop);
					} 
				} else {
					if (top < 1 ){
	//				console.log('left sidebar close to top');
					$('aside.columns.sidebar-first').addClass('scrolled');
	//				$('aside.columns.sidebar-first').css('position', 'fixed');
	//				$('aside.columns.sidebar-first').css('top', '0px');

	//				console.log('testing main big space was:');
	//				console.log(mainTop);
					} else if( mainTop >= 0 ) {
						$('aside.columns.sidebar-first').removeClass('scrolled');
	//					$('aside.columns.sidebar-first').css('position', 'relative');
	//					$('aside.columns.sidebar-first').css('top', '0px');
	//					console.log('testing main small space was:');
	//					console.log(mainTop);
					} 
				}
			}  // end of if footer on screen
			
			
			
		})
	}
	
    
    
    
    //for Calendar mobile year view
    if ($("body").hasClass("mobile-first-calendar-yearview")) {
        //alert('this is an alert');
		// if month from menu, redirect, else continue
		if(last == 'month') {

		   window.location="../calendar/year/" + yearNow + "#" + lastMonthName;
		
		} else {
			console.log('isnt month from menu');
		}
        
        $("body").on("scrollstart",function(){
          //alert("Started scrolling!");
        });
        
		function hidePart1 () {
			$('.calendar-nav-section.part-1').addClass('hidden');
			$('.calendar-nav-section.part-2').removeClass('hidden');
			$('a.part-1').addClass('hidden');
			$('a.part-2').removeClass('hidden');
			console.log('it is part 2 on screen'); 
		}
		function hidePart2 () {
			$('.calendar-nav-section.part-1').removeClass('hidden');
			$('.calendar-nav-section.part-2').addClass('hidden');
			$('a.part-1').removeClass('hidden');
			$('a.part-2').addClass('hidden');
			console.log('it is part 1 on screen');
		}
		
		
        $(document).scroll(function(){ // bind window scroll event
             //alert("Started scrolling!");

            // 1. 

				if( $('#July').is_on_screen() || $('#August').is_on_screen() || $('#September').is_on_screen() || $('#October').is_on_screen() || $('#November').is_on_screen() || $('#December').is_on_screen() ) { // if target element is visible on screen after DOM loaded           
					//alert('function worked');
//					$('.calendar-nav-section.part-1').addClass('hidden');
//					$('.calendar-nav-section.part-2').removeClass('hidden');
//					$('a.part-1').addClass('hidden');
//					$('a.part-2').removeClass('hidden');
					hidePart1() ;
				} else {
				   // alert('i can NOT see it');
//					$('.calendar-nav-section.part-1').removeClass('hidden');
//					$('.calendar-nav-section.part-2').addClass('hidden');
//					$('a.part-1').removeClass('hidden');
//					$('a.part-2').addClass('hidden');
//					console.log('it is part 1 on screen');
					hidePart2() ;
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
	if ($("body").hasClass("mobile-first-calendar-weekview")) {
	
		$(window).scroll(function(e){ 		
			// works for 1
			var sunTop = $('#header-1').offset().top - $(document).scrollTop();
			if (sunTop < 100 ){
				$(".calendar-nav-item.day-navigation-day-items").removeClass('currently-viewed');
				$("#day-1").addClass('currently-viewed');
			} 
			var monTop = $('#header-2').offset().top - $(document).scrollTop();
			if (monTop < 100 ){
				$(".calendar-nav-item.day-navigation-day-items").removeClass('currently-viewed');
				$("#day-2").addClass('currently-viewed');
			} 
			var tuesTop = $('#header-3').offset().top - $(document).scrollTop();
			if (tuesTop < 100 ){
				$(".calendar-nav-item.day-navigation-day-items").removeClass('currently-viewed');
				$("#day-3").addClass('currently-viewed');
			} 
			var wedTop = $('#header-4').offset().top - $(document).scrollTop();
			if (wedTop < 100 ){
				$(".calendar-nav-item.day-navigation-day-items").removeClass('currently-viewed');
				$("#day-4").addClass('currently-viewed');
			} 
			var thursTop = $('#header-5').offset().top - $(document).scrollTop();
			if (thursTop < 100 ){
				$(".calendar-nav-item.day-navigation-day-items").removeClass('currently-viewed');
				$("#day-5").addClass('currently-viewed');
			} 
			var friTop = $('#header-6').offset().top - $(document).scrollTop();
			if (friTop < 100 ){
				$(".calendar-nav-item.day-navigation-day-items").removeClass('currently-viewed');
				$("#day-6").addClass('currently-viewed');
			} 
			var satTop = $('#header-7').offset().top - $(document).scrollTop();
			if (satTop < 100 ){
				$(".calendar-nav-item.day-navigation-day-items").removeClass('currently-viewed');
				$("#day-7").addClass('currently-viewed');
			} 
			
			

		})
	}
    
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

		// calculate current week...
		var startString = "January 1 " + yearNow;
		var yearStartDate = new Date(startString);
		var yearStartTime = yearStartDate.getTime();
		console.log("year starts: " + yearStartDate);
		var yearStartWeekday = yearStartDate.getDay();
		console.log('year starts on weekday: ');
		console.log(yearStartWeekday); // is a 0-6
		var weekStartJanDay = 7 - yearStartWeekday;
		var week2StartTime = yearStartTime + (weekStartJanDay*24*3600);
		var weekNow = 2+ Math.floor((timeNow - week2StartTime)/(7 * 24 * 3600));
		var realWeek = yearNow + "-W" + weekNow;
		console.log(realWeek);


// [ moved url getting to top from here]
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
        

    if (( $("body").hasClass("page-node-add") ) || ( $("body").hasClass("page-node-edit")) || ( $("body").hasClass("page-node-clone")) ) {
        calcWeekday();
    }
    
    
    $('#edit-field-event-date-und-0-all-day').change(function(){
        var c = this.checked ? 'none' : 'inline';
        $('#edit-field-timezone').css('display', c);
//        var m = this.checked ? '0px' : '32px';
//        $('#edit-field-event-date-und-0-value').css('margin-bottom', m);
       // var p = this.checked ? '0px' : 'inline';
    });
	
	
	
	$('#edit-field-tickets-exist-und-no').change(function(){
        var n = this.checked ? 'none' : 'block';
        $('fieldset.group-pricing > legend').css('display', n);
    });
	$('#edit-field-tickets-exist-und-yes').change(function(){
        var y = this.checked ? 'block' : 'none';
        $('fieldset.group-pricing > legend').css('display', y);
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
    

	

        // mobile hide menu if clicked off of it
	 if ($("body").hasClass("mobile-first")) {
		   $('#page-container').click(function() {
			   if( $('header nav').hasClass('expanded') ) {
					console.log('hide menu!');
					$('header nav').removeClass("expanded"); 
			   }
		   }); 
		 $('#content-footer').click(function() {
			   if( $('header nav').hasClass('expanded') ) {
					console.log('hide menu!');
					$('header nav').removeClass("expanded"); 
			   }
		   }); 
		 // for left of menu that is technically invisible nav space
//		 $('nav').click(function() {
//			   if( $('header nav').hasClass('expanded') ) {
//					console.log('hide menu!');
//					$('header nav').removeClass("expanded"); 
//			   }
//		   }); 
	 }

	
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
//        console.log(mobileParams);           
        // mobile theme filters link if being filtered currently
        if( (mobileParams != 'field_tags_tid=') && (mobileParams != 'field_tags_tid=All') ){
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
    
//     if tickets button does not exist, move share button up
	if($('body').hasClass('node-type-event') && $('body').hasClass('large-screen')) {
		if($('body').hasClass('ff')) {
			console.log('is ff');
			if( $('.views-field-field-tickets-url').length ) { // has ticket button
				console.log('the tickets button is there');	
				if( $('.views-field-field-event-location').length ) {

//					$('section.block-social-share-social-share').css("top", "-129px");
					$('section.block-social-share-social-share').css("top", "-159px");
;	
					$('section.block-views-event-page-blocks-block-3').css("top", "-155px");
				} else { // yes tickets button, no location
//					
//					$('section.block-social-share-social-share').css("top", "-147px");
					$('section.block-social-share-social-share').css("top", "-176px");
			
					// no margin, pos rel, left 420px, top: -147px
					$('section.block-views-event-page-blocks-block-3').css("top", "-140px");
				}
			} else { // no tickets button, yes location
				if( $('.views-field-field-event-location').length ) {
					if(  $('.views-field-field-free').hasClass('tickets-exist-No') ) {
						$('section.block-social-share-social-share').css("top", "-214px");	
						$('section.block-views-event-page-blocks-block-3').css("top", "-205px");	
						console.log('ff and no tickets button with price or range selected but idk about if its empty or not');
					} else {
	//					console.log('ff: the locations field is there wo tickets button');
						$('section.block-social-share-social-share').css("top", "-194px");	
						$('section.block-views-event-page-blocks-block-3').css("top", "-185px");	
					}
					
				} else { // no tickets, no location
					if(  $('.views-field-field-free').hasClass('tickets-exist-No')) {
						$('section.block-social-share-social-share').css("top", "-231px");	
						$('section.block-views-event-page-blocks-block-3').css("top", "-219px");	
						console.log('ff and no tickets button/location with price or range selected but idk about if its empty or not');
					} else {
						$('section.block-social-share-social-share').css("top", "-211px");
						$('section.block-views-event-page-blocks-block-3').css("top", "-200px");
					}
				}
			} 
			
		} else if($('body').hasClass('chrome')) {  // chrome 
			console.log('has chrome class');
			if( $('.views-field-field-tickets-url').length ) { // yes tickets
				console.log('the tickets button is there');
	//			$('section.block-social-share-social-share').css("margin", "-131px 0px 10px 435px");	
				if( $('.views-field-field-event-location').length ) {  // yes, yes
					console.log('the tickets button is there and location is');
					$('section.block-social-share-social-share').css("margin", "-159px 0px 10px 435px");	
				} else { // yes tickets button, no location
					$('section.block-social-share-social-share').css("margin", "-176px 0px 10px 435px");
				}
			} else { // no tickets button, yes location
				if( $('.views-field-field-event-location').length ) {
					console.log('not ff: the locations field is there wo tickets button');
					if(  $('.views-field-field-free').hasClass('tickets-exist-No') ) {
						$('section.block-social-share-social-share').css("margin", "-216px 0px 10px 435px");
					} else {
//						$('section.block-social-share-social-share').css("margin", "-174px 0px 10px 435px");
						$('section.block-social-share-social-share').css("margin", "-196px 0px 10px 435px");
					}
					
					
				} else { // no tickets, no location
					if(  $('.views-field-field-free').hasClass('tickets-exist-No') ) {
						$('section.block-social-share-social-share').css("margin", "-232px 0px 10px 435px");
					} else {
						$('section.block-social-share-social-share').css("margin", "-213px 0px 10px 435px");
	//					$('section.block-social-share-social-share').css("margin", "-174px 0px 10px 435px");
					}
				}
			}
		} else if($('body').hasClass('safari')) {  // others, not ff or chrome
			
			if( $('.views-field-field-tickets-url').length ) {
				
	//			$('section.block-social-share-social-share').css("margin", "-131px 0px 10px 435px");	
				if( $('.views-field-field-event-location').length ) {
//					console.log('the tickets button is there and location is');
					$('section.block-social-share-social-share').css("margin", "-158px 0px 10px 435px");	
				} else { // yes tickets button, no location
					$('section.block-social-share-social-share').css("margin", "-175px 0px 10px 435px");
				}
			} else { // no tickets button, yes location
				if( $('.views-field-field-event-location').length ) {
					if(  $('.views-field-field-free').hasClass('tickets-exist-No') ) {
						$('section.block-social-share-social-share').css("margin", "-214px 0px 10px 435px");	
					} else {
						$('section.block-social-share-social-share').css("margin", "-194px 0px 10px 435px");	
					}
				} else { // no tickets, no location
					if(  $('.views-field-field-free').hasClass('tickets-exist-No') ) {
						$('section.block-social-share-social-share').css("margin", "-233px 0px 10px 435px");
					} else {
						$('section.block-social-share-social-share').css("margin", "-213px 0px 10px 435px");
					}
				}
			}
		} else {  // others, not ff or chrome or safari
			console.log('doesnt have ff class');
			if( $('.views-field-field-tickets-url').length ) {
				console.log('the tickets button is there');
	//			$('section.block-social-share-social-share').css("margin", "-131px 0px 10px 435px");	
				if( $('.views-field-field-event-location').length ) {
					console.log('the tickets button is there and location is');
					$('section.block-social-share-social-share').css("margin", "-151px 0px 10px 435px");	
				} else { // yes tickets button, no location
					$('section.block-social-share-social-share').css("margin", "-168px 0px 10px 435px");
				}
			} else { // no tickets button, yes location
				if( $('.views-field-field-event-location').length ) {
					if(  $('.views-field-field-free').hasClass('tickets-exist-No') ) {
						$('section.block-social-share-social-share').css("margin", "-213px 0px 10px 435px");	
					} else {
//						console.log('not ff: the locations field is there wo tickets button');
						$('section.block-social-share-social-share').css("margin", "-194px 0px 10px 435px");	
					}
				} else { // no tickets, no location
					if(  $('.views-field-field-free').hasClass('tickets-exist-No') ) {
						$('section.block-social-share-social-share').css("margin", "-222px 0px 10px 435px");	
					} else {
						$('section.block-social-share-social-share').css("margin", "-213px 0px 10px 435px");
					}
				}
			}
		}
	}
//    
//	/* --- subscribe button ---- */
//	$('#subscribe-link').click( function() {
//		console.log('into the click fxn');
//		$('#holdtext').innerText = $('#copytext').innerText;
//		var copied = $('#holdtext').createTextRange();
//		window.clipboardData.setData("Text", location.href);
//		copied.execCommand("Copy");
//	});
//	
	
	// hide sharebar for no role submitting an unpublished event
	 if($('body').hasClass('node-type-event') && $('body').hasClass('number-of-roles-1')) {
		 
		if($('div.node-event').hasClass('node-unpublished') ) {
				$('section.block-social-share-social-share').css("display", "none");
		}
	}	
	
    /* ------ formatting the subscribe to multiple page in workbench pages -------- */
	
	     $(".bef-checkboxes .form-item label").each( function() {
        var value = $(this).text();

        if(value.includes("----")) {
                $(this).css("font-weight", "normal");

                $(this).parent().css("padding-left", "32px");
				$(this).parent().css("font-size", "14px");
                var res = value.replace("----", "---- ");
                $(this).text(res);

        } else if(value.includes("---")) {
                $(this).css("color","#666");
                $(this).css("font-weight", "normal");

                $(this).parent().css("padding-left", "24px");
				$(this).parent().css("font-size", "15px");
                var res = value.replace("---", "--- ");
                $(this).text(res);

        } else if(value.includes("--")) {
                $(this).css("font-weight", "normal");

                $(this).parent().css("padding-left", "16px");
                var res = value.replace("--", "-- ");
                $(this).parent().css("font-size", "15px");
				$(this).text(res);

        } else if (value.includes("-")) {
                $(this).css("color","#666");
                $(this).parent().css("padding-left", "8px");
				$(this).parent().css("font-size", "15px");
                var res = value.replace("-", "- ");
                $(this).text(res);

        }
        value = "";
        });

 (function ($) {
Drupal.behaviors.betterExposedFilters = {
        attach: function(context) {
                console.log('form finished submitting, to start function');
        $(".view-id-subscribe_to_multiple .bef-checkboxes .form-item label").each(function() {
                console.log('got into resetting fxn');
                var value = $(this).text();

                if(value.includes("----")) {
                        $(this).css("font-weight", "normal");

                        $(this).parent().css("padding-left", "32px");
                        var res = value.replace("----", "---- ");
                        $(this).text(res);

                } else if(value.includes("---")) {
                        $(this).css("font-weight", "normal");

                        $(this).css("color","#666");
                        $(this).parent().css("padding-left", "24px");
                        var res = value.replace("---", "--- ");
                        $(this).text(res);

                } else if(value.includes("--")) {
                        $(this).css("font-weight", "normal");

                        $(this).parent().css("padding-left", "16px");
                        var res = value.replace("--", "-- ");
                        $(this).text(res);

                } else if (value.includes("-")) {
                        $(this).css("color","#666");
                        $(this).parent().css("padding-left", "8px");

                        var res = value.replace("-", "- ");
                        $(this).text(res);

                }
                value = "";
        });


        }}

	
	
});


