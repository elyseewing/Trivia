define([
  'Underscore',
  'Backbone'
], function(_, Backbone) {
  var questionsModel = Backbone.Model.extend({
    urlRoot: "http://elysedougherty.com/question",
    initialize: function(){
    }
    
  });
  return questionsModel;

});
