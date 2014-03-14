SimpleGoogleReader.Views.ArticlesShow = Backbone.View.extend({

  template: JST['articles/show'],

  render: function(){
    this.$el.html( this.template( this.model.toJSON() ) );
    // console.log( this.model.toJSON() );
    return this;
  }

});
