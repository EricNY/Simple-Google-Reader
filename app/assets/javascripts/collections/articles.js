SimpleGoogleReader.Collections.Articles = Backbone.Collection.extend({

  url: '/articles',
  model: SimpleGoogleReader.Models.Article,

          // collection "add" event callbacks pass the model as the first n
        // param to the callback
    force_update: function(publication) {
        var data = {
            feed_url: publication.get("url")
        };

        var callback = _.bind(function() {
            this.trigger('force-update');
        }, this);

        $.post('/articles/force_update', data).done(callback);
    }


});
