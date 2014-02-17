SimpleGoogleReader.Views.ArticlesShow = Backbone.View.extend({

  template: JST['articles/show'],

  el: '#article',

  render: function(){
    this.$el.html( this.template({articles: this.model.toJSON()}) );
    return this;
  }

});
