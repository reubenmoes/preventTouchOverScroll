//
// Helper function for preventing touchmove from scrolling body while scrolling overflow:scroll divs
// NOTE: this only works if scrolling starts when content is at top/bottom.  If touchmove is slow
// this approach will not catch it.  Hopefully that is okay.
// reuben@domain7.com
(function($){

  function preventTouchOverScroll(element){
    //NOTE: there is no kill/unbind function for this.  May need that eventually
    var y,
        $element = $(element);
    $element.on('touchstart', function(e){
      y = e.originalEvent.changedTouches[0].screenY;
    });
    $element.on('touchmove', function(e){
      var newY = e.originalEvent.changedTouches[0].screenY;

      //scrolling viewport down! are we at the bottom?
      if(newY < y && $element.height() + $element.scrollTop() >= element.scrollHeight){
        //debugger;

        e.preventDefault();
      }
      //Scrolling viewport up! we at the top?
      else if (newY > y && $element.scrollTop() <= 0){
        e.preventDefault();
      }
    });
  };

  $.fn.preventTouchOverScroll = function(){
    return this.each(function() {
      preventTouchOverScroll(this);
    });
  };

})(jQuery);

