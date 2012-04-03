define([
  'jQuery',
  'Underscore',
  'Backbone',
  'models/questions',
  'collections/questions',
  'text!templates/questions/add.html',
   'views/questions/random',
   'views/questions/edit'
], function($, _, Backbone, questionsModel, questionsCollection, questionAddTemplate, questionsRandomView, questionsEditView ) {
  var questionAddView = Backbone.View.extend({
    el: $("body"), 
    initialize: function() {
        
    }, 
    render: function() {
      var data = {
        model: new questionsModel(), 
	    _: _
      };
      var compiledTemplate = _.template(questionAddTemplate, data);
      this.el.html(compiledTemplate);
    }, 

    events: {
      "click #add":"addQuestion"
    },

    addQuestion: function(event) {
      event.preventDefault();
      var modQuestion = $('#question').val();
      var modAnswer = $('#answer').val();
      var attributes = { question: modQuestion, answer: modAnswer };
      var options = {
        success: function() {
          alert("Question was added.");
          questionsRandomView.initialize();
          //questionsEditView.render(model.id);
        },
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
      var model = new questionsModel();
      model.save(attributes, options);
    }

  });
  return new questionAddView;
});
