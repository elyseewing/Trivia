define([
  'jQuery',
  'Underscore',
  'Backbone',
  'models/questions'
], function($, _, Backbone, questionsModel){
  var questionsCollection = Backbone.Collection.extend({
    model: questionsModel, 
      url: function() { 
        return "http://elysedougherty.com/question/";
      }
  });
 
  return new questionsCollection;
});
