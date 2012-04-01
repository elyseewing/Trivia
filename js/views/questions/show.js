define([
  'jQuery',
  'Underscore',
  'Backbone',
  'models/questions',
  'collections/questions',
  'text!templates/questions/show.html'
], function($, _, Backbone, questionsModel, questionsCollection, questionShowTemplate) {
  var questionShowView = Backbone.View.extend({
    initialize: function() {

    }, 
    render: function(id) {
      var data = {
        model: questionsCollection.get(id), 
        _ : _
      };
      var compiledTemplate = _.template(questionShowTemplate, data);
      $("body").html(compiledTemplate);
    }, 

    events: {
      "submit form#edit-question":"saveQuestion"
    },

    saveQuestion: function(event) {
      event.preventDefault();
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
    }

  });
  return new questionShowView;
});
