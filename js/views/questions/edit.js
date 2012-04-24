define([
  'jQuery',
  'Underscore',
  'Backbone',
  'models/questions',
  'collections/questions',
  'text!templates/questions/edit.html',
  'text!templates/questions/random.html'
], function($, _, Backbone, questionsModel, questionsCollection, questionEditTemplate, questionRandomTemplate) {
  var questionEditView = Backbone.View.extend({
    el: $("body"),
    initialize: function(id) {
	if (id != null)
	{
	  _.bindAll(this, 'render');
	  _.bindAll(this, 'saveQuestion');
	  this.model = new questionsModel();
	  this.model.id = id;
	  this.model.fetch({ success: this.render });
	}
    }, 
    render: function() {
      var data = {
        model: this.model,
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
      var modFlag = ($('#flag').is(':checked') == true) ? 1 : 0;
      var modReason = $('#flag-reason').val();
      var questionID = this.model.id;
      
      var attributes = { question: modQuestion, answer: modAnswer, flag: modFlag, flag_text: modReason  };
      var options = {
        success: function() {
	    Backbone.history.navigate('questions/' + questionID + '/', {trigger: true});
        },
        error: function(model, errors) {
            $('.errors').html(errors.join("<br/>")).show();
        }
      };
      this.model.save(attributes, options);
    },
    randomQuestion: function() {
        Backbone.history.navigate('/', {trigger: true});
    }

  });
  return questionEditView;
});
