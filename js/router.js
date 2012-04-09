// Filename: router.js
define([
  'jQuery',
  'Underscore',
  'Backbone',
  'views/home/main',
  'views/questions/add',
  'views/questions/edit',
  'views/questions/random'
], function($, _, Backbone, mainHomeView, questionAddView, questionEditView, questionRandomView ){
  var AppRouter = Backbone.Router.extend({
    routes: {
      ""                   :"randomQuestion",
      "/"                  :"randomQuestion",
      "questions/add"      :"newQuestion",
      "questions/:id/edit" :"editQuestion",
      "*actions"           :"defaultAction"
    },
    randomQuestion: function() {
      var view = new questionRandomView();
      view.initialize();
    },
    newQuestion: function() {
      var view = new questionAddView();
      view.render();
    },
    editQuestion: function(id) {
      var view = new questionEditView();
      view.render(id);
    },
    defaultAction: function(actions){
      var view = new mainHomeView();
      view.render();
    }
  });

  var initialize = function(){
    var app_router = new AppRouter;
    Backbone.history.start({pushState:true});
  };
  return { 
    initialize: initialize
  };
});
