// Filename: router.js
define([
  'jQuery',
  'Underscore',
  'Backbone',
  'views/home/main',
  'views/questions/list',
  'views/questions/add',
  'views/questions/show',
  'views/questions/random'
], function($, _, Backbone, mainHomeView, questionListView, questionAddView, questionShowView, questionRandomView ){
  var AppRouter = Backbone.Router.extend({
    routes: {
      // Define some URL routes
      "/questions":"showQuestions",
      "/questions/random":"randomQuestion",
      "/questions/add":"newQuestion",
      "/questions/:id":"getQuestion",
      
      // Default
      "*actions":"defaultAction"
    },
    showQuestions: function() {
      questionListView.render();
    },
    randomQuestion: function() {
      questionRandomView.render();
    },
    newQuestion: function() {
      questionAddView.render();
    },
    getQuestion: function(id) {
      questionShowView.render(id);
    },
    defaultAction: function(actions){
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
