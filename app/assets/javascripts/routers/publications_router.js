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
      articles.fetch({success: function(){console.log('articles.fething...');}});
    });

    publications.fetch();
    // articles.fetch();

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

  // destroys the proper publication but still needs to update the view
  // does not destroy the articles!!!!!!
  // see SO answer about deleting?
  delete_publication: function(id){
    var publication = new SimpleGoogleReader.Models.Publication({id: id});
    publication.fetch({
      success: function(x){
      }
    });
    console.log(publication);
    publication.destroy();

    var articles = new SimpleGoogleReader.Collections.Articles();
    articles.fetch({
      data: {publication_id: id},
      success: function(x){
        articles.destroy();
      }
    });
    // console.log(articles);
    // articles.destroy();
  }

});



