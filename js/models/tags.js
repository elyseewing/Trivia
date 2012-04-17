define([
  'Underscore',
  'Backbone'
], function(_, Backbone) {
  var tagsModel = Backbone.Model.extend({
    initialize: function() {

    },
    url: function() {
      return "http://api.elysedougherty.com/tag";
    }
  });

  return tagsModel;
});
