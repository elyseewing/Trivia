// Filename: router.js
define([
  'jQuery',
  'Underscore',
  'Backbone',
  'views/home/main',
  'views/questions/list',
  'views/questions/show'
], function($, _, Backbone, mainHomeView, questionListView, questionShowView ){
  var AppRouter = Backbone.Router.extend({
    routes: {
      // Define some URL routes
      '/questions': 'showQuestions',
      '/questions/:id': 'getQuestion',
      
      // Default
      '*actions': 'defaultAction'
    },
    showQuestions: function() {
      questionListView.render();
    },
    getQuestion: function(id) {
      questionShowView.render(id);
      //alert("Get question ID " + id);
    },
    defaultAction: function(actions){
      // We have no matching route, lets display the home page 
      mainHomeView.render(); 
    }
  });

  var initialize = function(){
    var app_router = new AppRouter;
    Backbone.history.start();
  };
  return { 
    initialize: initialize
  };
});