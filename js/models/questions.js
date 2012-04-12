define([
  'Underscore',
  'Backbone'
], function(_, Backbone) {
  var questionsModel = Backbone.Model.extend({
    initialize: function() {
      
    },
    url: function() {
      return "http://api.elysedougherty.com/question/" + this.get("id");
    },
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
