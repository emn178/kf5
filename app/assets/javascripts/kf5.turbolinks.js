(function ($) {
  var widgets = $();

  $(document).on('page:before-unload', function store() {
    if (!widgets.length) {
      widgets = $('#kf5-support-123456789');
      if (widgets.length) {
        widgets = $([widgets[0], widgets.prev()[0], widgets.prev().prev()[0]]);
      }
    }
  });

  $(document).on('page:load', function (argument) {
    $('body').append(widgets);
  });
})(jQuery);
