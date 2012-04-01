define([
  'jQuery',
  'Underscore',
  'Backbone',
  'models/questions',
  'collections/questions',
  'text!templates/questions/random.html'
], function($, _, Backbone, questionsModel, questionsCollection, questionRandomTemplate) {
  var questionRandomView = Backbone.View.extend({
    initialize: function() {
      this.collection = questionsCollection;
      this.collection.bind('all', this.render, this);
      this.collection.fetch();
    }, 
    render: function() {
      var data = {
        model: this.collection.first(),
        $: $,
        _ : _
      };
      var compiledTemplate = _.template(questionRandomTemplate, data);
      $("body").html(compiledTemplate);
    },

    events: {
      "click #next-question":"nextQuestion"
    },

    nextQuestion: function(event) {
      event.preventDefault();
      var data = {
        model: this.collection.first(),
        $: $,
        _ : _
      };
      var compiledTemplate = _.template(questionRandomTemplate, data);
      $("body").html(compiledTemplate);
    }

  });
  return new questionRandomView;
});
