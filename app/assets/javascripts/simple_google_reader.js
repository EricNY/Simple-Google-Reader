window.SimpleGoogleReader = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    new SimpleGoogleReader.Routers.Publications;
    Backbone.history.start();
  }
};

$(document).ready(function(){
  SimpleGoogleReader.initialize();
});

