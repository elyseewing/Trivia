// Filename: views/questions/list
define([
  'jQuery',
  'Underscore',
  'Backbone',
  // Pull in the Collection module from above
  'collections/questions',
  'text!templates/questions/list.html'

], function($, _, Backbone, questionsCollection, questionListTemplate){
  var questionListView = Backbone.View.extend({
    el: $("#page"),
    initialize: function(){
      this.collection = questionsCollection;
      this.collection.bind('all', this.render, this);
      this.collection.fetch();
      //this.collection.bind("add", this.exampleBind);
      //this.collection = questionsCollection.add({ id: "1", name: "Test 1"});
    },
    render: function() {
      var data = {
        questions: this.collection.models,
        _: _ 
      };
      var compiledTemplate = _.template( questionListTemplate, data );
      $("#page").html( compiledTemplate ); 
    }
  });
  return new questionListView;
});
