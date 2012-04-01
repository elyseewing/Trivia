define([
  'Underscore',
  'Backbone'
], function(_, Backbone) {
  var questionsModel = Backbone.Model.extend({
    initialize: function() {
      
    },
    urlRoot: "http://localhost:3000/question",
    validate: function(attributes) {
      var errors = [];
      if (!/\S/.test(attributes.question))
        errors.push("Question cannot be blank.");
      if (!/\S/.test(attributes.answer))
	errors.push("Answer cannot be blank.");
      if (errors.length > 0)
	return errors;
    }
    
  });
  return questionsModel;

});
