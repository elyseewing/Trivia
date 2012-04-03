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
      this.collection = questionsCollection;
      _.bindAll(this, 'render');
      //this.collection.bind('render', this.render, this);
      this.collection.fetch({success: this.render });
    },
    render: function() {
      var data = {
        // collection.models array only contains one element
        model: this.collection.models[0],
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
        model: this.collection.models[0],
        $: $,
        _ : _
      };
      var compiledTemplate = _.template(questionRandomTemplate, data);
      $("body").html(compiledTemplate);
    }

  });
  return new questionRandomView;
});