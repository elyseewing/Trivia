define([
  'jQuery',
  'Underscore',
  'Backbone',
  'collections/questions',
  'text!templates/questions/show.html'
], function($, _, Backbone, questionsCollection, questionShowTemplate) {
  var questionShowView = Backbone.View.extend({
    el: $("#page"), 
    initialize: function() {

    }, 
    render: function(id) {
      var data = {
        model: questionsCollection.get(id), 
	_: _
      };
      var compiledTemplate = _.template(questionShowTemplate, data);
      $("#page").html(compiledTemplate);
    }
  });
  return new questionShowView;
});
