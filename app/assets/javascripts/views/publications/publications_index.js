SimpleGoogleReader.Views.PublicationsIndex = Backbone.View.extend({

  template: JST['publications/index'],

  el: '#publication',

  initialize: function() {
    this.listenTo(this.model, "sync", this.render);
  },

  render: function(){
    this.$el.html( this.template({publications: this.model.toJSON()}) );
    return this;
  }

});




