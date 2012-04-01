define([
  'jQuery',
  'Underscore',
  'Backbone',
  'models/questions',
  'collections/questions',
  'text!templates/questions/random.html'
], function($, _, Backbone, questionsModel, questionsCollection, questionRandomTemplate) {
  var questionRandomView = Backbone.View.extend({
    el: $("#page"), 
    initialize: function() {

    }, 
    render: function() {
      var data = {
        model: this.getRandom(),
        $: $,
        _ : _
      };
      var compiledTemplate = _.template(questionRandomTemplate, data);
      $("#page").html(compiledTemplate);
    },
    getRandom: function() {
        var id = Math.floor((Math.random()*questionsCollection.length)+1);
        if (questionsCollection.get(id) != null) {
            return questionsCollection.get(id);
        } else {
            this.getRandom();
        }
    },

    events: {
      "click #next-question":"nextQuestion"
    },

    nextQuestion: function(event) {
      event.preventDefault();
      var data = {
        model: this.getRandom(),
        $: $,
        _ : _
      };
      var compiledTemplate = _.template(questionRandomTemplate, data);
      $("#page").html(compiledTemplate);
    }

  });
  return new questionRandomView;
});
