SimpleGoogleReader.Views.PublicationsIndex = Backbone.View.extend({

  template: JST['publications/index'],

  el: '#publication',

  events:{
    'click #new_feed': 'createFeed',
    'click #refresh': 'updateFeed'

  },

  initialize: function() {
    this.listenTo(this.collection, "sync", this.render);
  },

  render: function(){
    this.$el.html( this.template({publications: this.collection.toJSON()}) );
    return this;
  },

  createFeed: function(e){
    e.preventDefault();
    var feed_url = $('#new_feed_name').val();
    // var that = this;

    this.collection.create(
      { url: feed_url, feed_url: feed_url
      },
      { success: function(data){
        // var name = data.attributes.name;
        // console.log(data);
        }
      });

  },

  updateFeed: function(e){
    e.preventDefault();
    for(var i = 0; i < this.collection.length; i++){
      // console.log(this.collection.models[i].attributes);
        $.post('/articles/force_update', {
          url: this.collection.models[i].attributes.feed_url,
          publication_id: this.collection.models[i].attributes.id,
          publication_name: this.collection.models[i].attributes.name},

          function(data){
          // console.log(data);
        }, 'json');
    }

    // var publications = new SimpleGoogleReader.Collections.Publications();
    // publications.fetch({success: function(data){
    //   for(var i = 0; i < data.models.length; i++){
    //     console.log(data.models[i].attributes);
    //   };
    // }});

  }

});

