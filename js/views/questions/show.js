define([
  'jQuery',
  'Underscore',
  'Backbone',
  'models/questions',
  'collections/questions',
  'text!templates/questions/show.html', 
  'text!templates/questions/new.html'
], function($, _, Backbone, questionsModel, questionsCollection, questionShowTemplate, questionNewTemplate) {
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
    }, 

    events: {
      "click .save":"saveQuestion"
    },

    newQuestion: function() {
      var data = { model: new questionsModel(), _: _ };
      var compiledTemplate = _.template(questionNewTemplate, data);
      $("#page").html(compiledTemplate);
    },

    saveQuestion: function() {
      var modQuestion = $('#question').val();
      var modAnswer = $('#answer').val();
      var questionID = $('#id').val();
      if (questionID > 0)
      {
        var model = questionsCollection.get(questionID);
	var attributes = { question: modQuestion, answer: modAnswer };
	var options = {
          success: function() { alert("Question was updated."); },

          error: function(model, errors) {
            $('.errors').html(errors.join("<br/>")).show();
          }
        };
	model.save(attributes, options);
      }
      else { 
	var attributes = { question: modQuestion, answer: modAnswer };
	var options = {
          success: function() { alert("Question was added."); },

          error: function(model, errors) {
            $('.errors').html(errors.join("<br/>")).show();
          }
        };
	questionsCollection.create(attributes, options);
      }
      return false;
    }

  });
  return new questionShowView;
});
