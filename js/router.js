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
      ""                    :"randomQuestion",
      "/questions/add"      :"newQuestion",
      "/questions/:id/edit" :"editQuestion",
      "*actions"            :"defaultAction"
    },
    randomQuestion: function() {
      questionRandomView.initialize();
    },
    newQuestion: function() {
      questionAddView.render();
    },
    editQuestion: function(id) {
      questionEditView.render(id);
    },
    defaultAction: function(actions){
      mainHomeView.render();
    }
  });

  var initialize = function(){
    $.pushStateEnabled = true;

    var app_router = new AppRouter;
    Backbone.history.start();
  };
  return { 
    initialize: initialize
  };
});
