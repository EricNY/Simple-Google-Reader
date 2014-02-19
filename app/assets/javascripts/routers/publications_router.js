SimpleGoogleReader.Routers.Publications = Backbone.Router.extend({
  routes: {
    '': 'home',
    'all_articles': 'get_all_articles',
    'publications/:id': 'articles_by_id',
    'publications/:id/delete': 'delete_publication'
  },

  home: function(){

    var publications = new SimpleGoogleReader.Collections.Publications();
    var articles = new SimpleGoogleReader.Collections.Articles();
    var pubIndex = new SimpleGoogleReader.Views.PublicationsIndex({model: publications});
    var artIndex = new SimpleGoogleReader.Views.ArticlesIndex({model: articles});

    //method to replace the force_update post in your publications view
    articles.listenTo(publications, "sync", function(){
      // var articles = new SimpleGoogleReader.Collections.Articles();
      articles.fetch( {success: function(){}} );
    });

    publications.fetch();

  },

  get_all_articles: function(){
    var articles = new SimpleGoogleReader.Collections.Articles();
    articles.fetch({
      success: function(articles){
        var view = new SimpleGoogleReader.Views.ArticlesIndex({model: articles});
        view.render();
      }
    });
  },

  articles_by_id: function(id){
    var articles = new SimpleGoogleReader.Collections.Articles();
    articles.fetch({
      data: {publication_id: id},
      success: function(x){
        var view = new SimpleGoogleReader.Views.ArticlesIndex({model: articles});
        view.render();
      }
    });
  },

  //still needs to update the view
  delete_publication: function(id){
    //fetch publication w specified id and destroy it
    var publication = new SimpleGoogleReader.Models.Publication({id: id});
    publication.fetch();
    publication.destroy();


    var articles = new SimpleGoogleReader.Collections.Articles();

    articles.fetch({
      success: function(data){

        _.each(data.models, function(item){
          if (item.toJSON().publication_id == id) {
            item.destroy();
          }
        });// end _each

      }// end success fn
    });//end articles fetch

  }

});


