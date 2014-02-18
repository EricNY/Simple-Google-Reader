SimpleGoogleReader.Views.ArticlesIndex = Backbone.View.extend({

  template: JST['articles/index'],

  el: '#article',

  initialize: function() {
    this.listenTo(this.model, "sync", this.render);
  },

  render: function(){
    this.$el.html( this.template({articles: this.model.toJSON()}) );
    return this;
  }

});
