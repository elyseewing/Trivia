define([
  'jQuery',
  'Underscore',
  'Backbone',
  'models/questions'
], function($, _, Backbone, questionsModel) {
  var questionsCollection = Backbone.Collection.extend({
    model: questionsModel, 
    url: function() {
      return "http://localhost:3000/question/";
    }
  });
 
  return new questionsCollection;
});