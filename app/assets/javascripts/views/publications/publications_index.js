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
    this.$el.html( this.template({publications: this.collection.toJSON()}) );
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
        var name = data.attributes.name;
        $.post('/articles/force_update', {url: feed_url, publication_id: data.id, publication_name: name}, function(data){
            console.log(data);
          }, 'json');
        }
      });

  }

});


