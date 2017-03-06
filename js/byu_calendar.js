(function ($, Drupal) {

  Drupal.behaviors.byu_calendar = {
    attach: function(context, settings) {
      // Get your Yeti started.
    }
  };

    

    
    
    
})(jQuery, Drupal);

//theme hasn't recognized this file yet.

jQuery( document ).ready(function( $ ) {
    console.log('its loaded');
        $(".mobile-nav-link").click(function() {
            console.log("its working");
            $.each(".mobile-nav-item").removeClass("active");
            $this.children(".mobile-nav-item").addClass("active");
    
        }); 
    
});