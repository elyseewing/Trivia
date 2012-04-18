define([
  'Underscore',
  'Backbone'
], function(_, Backbone) {
  var tagsModel = Backbone.Model.extend({
    initialize: function() {

    },
    url: function() {
      if (this.id != undefined) {
        return "http://api.elysedougherty.com/tag/" + this.id;
      }
      return "http://api.elysedougherty.com/tag";
    }
  });

  return tagsModel;
});
