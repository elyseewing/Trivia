define([
  'jQuery',
  'Underscore',
  'Backbone',
  'models/questions',
  'collections/questions',
  'text!templates/questions/random.html',
  'views/questions/add',
  'views/questions/edit'
], function($, _, Backbone, questionsModel, questionsCollection, questionRandomTemplate, questionAddView, questionEditView ) {
  var questionRandomView = Backbone.View.extend({
    el: $("body"),
    initialize: function() {
      this.collection = new questionsCollection();
      _.bindAll(this, 'render');
      this.collection.fetch({success: this.render });
    },
    render: function() {
      this.model = new questionsModel();
      if (this.collection.models.length > 0) {
	// since the API only ever loads a collection containing one model, take the first one
	this.model = this.collection.models[0];
      }
      var data = {
        model: this.model,
        $: $,
        _ : _
      };
      var compiledTemplate = _.template(questionRandomTemplate, data);
      $("body").html(compiledTemplate);
    },

    events: {
      "click #next-question":"nextQuestion",
      "click #add-question" :"addAQuestion",
      "click #edit-question":"editAQuestion"
    },

    nextQuestion: function() { 
        Backbone.history.navigate('/', {trigger: true});
    },
    addAQuestion: function() {
        Backbone.history.navigate('questions/add', {trigger: true});
    },
    editAQuestion: function() {
        Backbone.history.navigate('questions/' + this.collection.models[0].id + '/edit', {trigger: true});
    }

  });
  return questionRandomView;
});
