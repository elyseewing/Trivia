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
    initialize: function(id) {
	this.model = new questionsModel();
	this.model.id = id;
	this.collection = new questionsCollection(this.model);
        _.bindAll(this, 'render');
        this.collection.fetch({success: this.render });
    }, 
    render: function() {
      var data = {
        model: this.collection.models[0],
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
      var model = this.collection.models[0];
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
    },
    randomQuestion: function() {
        Backbone.history.navigate('/', {trigger: true});
    }

  });
  return questionEditView;
});
