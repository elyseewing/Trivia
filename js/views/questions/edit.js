define([
  'jQuery',
  'Underscore',
  'Backbone',
  'models/questions',
  'collections/questions',
  'text!templates/questions/edit.html'
], function($, _, Backbone, questionsModel, questionsCollection, questionEditTemplate) {
  var questionEditView = Backbone.View.extend({
    el: $("body"),
    initialize: function() {
        //this.bind('render', this.render, this);
        //_.bindAll(this, 'render');
    }, 
    render: function(id) {
      var data = {
        model: questionsCollection.get(id),
        _ : _
      };
      var compiledTemplate = _.template(questionEditTemplate, data);
      $("body").html(compiledTemplate);
    }, 

    events: {
      "click #save":"saveQuestion",
      "click #random-question":"randomQuestion"
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
          success: function() {
              alert("Question was updated.");
          },
          error: function(model, errors) {
            $('.errors').html(errors.join("<br/>")).show();
          }
        };
        model.save(attributes, options);
      }
    },
    randomQuestion: function() {
        Backbone.history.navigate('/', {trigger: true});
    }

  });
  return questionEditView;
});
