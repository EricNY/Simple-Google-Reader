SimpleGoogleReader.Views.ArticlesIndex = Backbone.View.extend({

  template: JST['articles/index'],

  el: '#article',

  events:{
    'click #new_feed': 'createFeed'
  },

  initialize: function() {
    this.listenTo(this.model, "sync", this.render);
    // this.model.on('change', this.render, this);
  },

  render: function(){
    this.$el.html( this.template({articles: this.model.toJSON()}) );
    return this;
  },

  createFeed: function(e){
    e.preventDefault();
    var feed_url = $('#new_feed_name').val();

    $.post('/publications', {url: feed_url}, function(data){
      $.post('/articles/force_update', {url: feed_url, publication_id: data.id}, function(data){
        var publications = new SimpleGoogleReader.Collections.Publications();
        publications.fetch({
          success: function(publications){
            var view = new SimpleGoogleReader.Views.PublicationsIndex({model: publications});
            view.render();
            var articles = new SimpleGoogleReader.Collections.Articles();
            articles.fetch();
          }
        });
      });
    }, 'json');

    // this.model.sync('create', {url: feed_url});

    // this.model.create(
    //   {url: feed_url},
    //   { success: function(d){ console.log(d.id); } }
    // );

  }

});
