define([
  'jQuery',
  'Underscore',
  'Backbone',
  'models/questions'
], function($, _, Backbone, questionsModel) {
  var questionsCollection = Backbone.Collection.extend({
    model: questionsModel, 
    url: function() {
      return "http://api.elysedougherty.com/question/";
    }
  }); 
  return questionsCollection;
});
