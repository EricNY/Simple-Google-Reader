SimpleGoogleReader.Views.PublicationsIndex = Backbone.View.extend({

  template: JST['publications/index'],

  el: '#publication',

  events:{
    'click #new_feed': 'createFeed'
  },

  initialize: function() {
    this.listenTo(this.collection, "sync", this.render);
  },

  render: function(){
    console.log("PublicationsIndex")
    console.log(this.collection.toJSON());
    this.$el.html( this.template({publications: this.collection.toJSON()}) );


    // this.$el.html( this.template({publications: {name: 'eric'}}) );
    return this;
  },

  createFeed: function(e){
    e.preventDefault();
    var feed_url = $('#new_feed_name').val();
    // var that = this;

    this.collection.create(
      { url: feed_url
      },
      { success: function(data){
        $.post('/articles/force_update', {url: feed_url, publication_id: data.id}, function(data){
          });
        }
      }
    );

  }

});




