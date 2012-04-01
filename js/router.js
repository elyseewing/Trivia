// Filename: router.js
define([
  'jQuery',
  'Underscore',
  'Backbone',
  'views/home/main',
  'views/questions/add',
  'views/questions/show',
  'views/questions/random'
], function($, _, Backbone, mainHomeView, questionAddView, questionShowView, questionRandomView ){
  var AppRouter = Backbone.Router.extend({
    routes: {
      ""                    :"randomQuestion",
      "/questions/random"   :"randomQuestion",
      "/questions/add"      :"newQuestion",
      //"/questions/:id"    :"getQuestion",
      
      // Default
      "*actions"            :"defaultAction"
    },
    randomQuestion: function() {
      questionRandomView.render();
    },
    newQuestion: function() {
      questionAddView.render();
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
