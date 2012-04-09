define([
  'jQuery',
  'Underscore',
  'Backbone',
  'text!templates/home/main.html'
], function($, _, Backbone, mainHomeTemplate){
  var mainHomeView = Backbone.View.extend({
    render: function(){
      $("body").html(mainHomeTemplate);
    }
  });
  return mainHomeView;
});
