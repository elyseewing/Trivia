define([
  'jQuery',
  'Underscore',
  'Backbone',
  'models/questions',
  'collections/questions',
  'text!templates/questions/add.html'
], function($, _, Backbone, questionsModel, questionsCollection, questionAddTemplate) {
  var questionAddView = Backbone.View.extend({
    el: $("#page"), 
    initialize: function() {

    }, 
    render: function() {
      var data = {
        model: new questionsModel(), 
	_: _
      };
      var compiledTemplate = _.template(questionAddTemplate, data);
      $("#page").html(compiledTemplate);
    }, 

    events: {
      "submit form#add-question":"addQuestion"
    },

    addQuestion: function(event) {
      event.preventDefault();
      var modQuestion = $('#question').val();
      var modAnswer = $('#answer').val();
      var attributes = { question: modQuestion, answer: modAnswer };
      var options = {
        success: function() { alert("Question was added."); },
        error: function(model, errors) {
          if (errors != null) {
	    $('.errors').html(errors.join("<br/>")).show();
	  }
	  else
	  {
	    alert("Something else went wrong.");
	  }
        }
      };
      questionsCollection.create(attributes, options);
    }

  });
  return new questionAddView;
});
