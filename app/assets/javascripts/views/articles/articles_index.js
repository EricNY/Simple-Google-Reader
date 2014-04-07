SimpleGoogleReader.Views.ArticlesIndex = Backbone.View.extend({

  template: JST['articles/index'],

  el: '#article',

  events:{
    'submit #new_feed': 'createFeed',
    'click .article-link': 'showInfo'
  },

  initialize: function() {
    this.listenTo(this.model, "sync", this.render);
  },

  render: function(){
    this.$el.html( this.template({articles: this.model.toJSON()}) );
    console.log(this.model.toJSON());
    return this;
  },

  showInfo: function(e){
    e.preventDefault();
    if($(e.currentTarget).hasClass("opened")) {
      $(e.currentTarget).removeClass("opened");
      $(e.currentTarget).closest("li").find(".content").html("");
    } else {
      var id = $(e.currentTarget).data('articleId');
      $(e.currentTarget).addClass("opened");

      var model = new SimpleGoogleReader.Models.Article({id: id});
      model.fetch({
        success: function(model){
          var view = new SimpleGoogleReader.Views.ArticlesShow({model: model});
          $(e.target).closest("li").find(".content").html(view.render().el);
          // console.log(model);
        }
      });
    }

  }

});
