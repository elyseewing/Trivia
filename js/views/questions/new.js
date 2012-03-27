define([
  'jQuery',
  'Underscore',
  'Backbone',
  'models/questions',
  'collections/questions',
  'text!templates/questions/new.html'
], function($, _, Backbone, questionsModel, questionsCollection, questionNewTemplate) {
  var questionNewView = Backbone.View.extend({
    el: $("#page"), 
    initialize: function() {

    },
    render: function() {
      var data = { 
	model: new questionsModel(), _: _ 
      };
      var compiledTemplate = _.template(questionNewTemplate, data);
      $("#page").html(compiledTemplate);
    }, 

    events: {
      "click .add":"addQuestion"
    },

    addQuestion: function() {
      var newText = $('#question').val();
      var attributes = { question: newText };
      var options = {
	success: function() { alert("Question was added."); },
  	error: function(model, errors) {
	  $('.errors').html(errors.join("<br/>")).show();
	}
      };
      questionsCollection.create(attributes, options);
      return false;
    }

  });

});
