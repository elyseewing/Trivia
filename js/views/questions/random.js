define([
  'jQuery',
  'Underscore',
  'Backbone',
  'models/questions',
  'models/tags',
  'collections/questions',
  'text!templates/questions/random.html',
  'views/questions/add',
  'views/questions/edit'
], function($, _, Backbone, questionsModel, tagsModel, questionsCollection, questionRandomTemplate, questionAddView, questionEditView ) {
  var questionRandomView = Backbone.View.extend({
    el: $("body"),
    initialize: function() {
      this.collection = new questionsCollection();
      _.bindAll(this, 'render');
      _.bindAll(this, 'editAQuestion');
      _.bindAll(this, 'flagAQuestion');
      _.bindAll(this, 'addATag');
      this.collection.fetch({success: this.render });
    },
    render: function() {
      if (this.model == undefined)
      {
        if (this.collection.models.length > 0) {
	  // since the API only ever loads a collection containing one model, take the first one
	  this.model = this.collection.models[0];
	  this.id = this.model.id;
        }
      }
      var data = {
        model: this.model,
        $: $,
        _ : _
      };
      var compiledTemplate = _.template(questionRandomTemplate, data);
      $("body").html(compiledTemplate);
    },

    events: {
      "click #next-question":"nextQuestion",
      "click #add-question" :"addAQuestion",
      "click #edit-question":"editAQuestion",
      "click #flag-question":"flagAQuestion",
      "click #add-tag":"addATag"
    },

    nextQuestion: function() { 
        Backbone.history.navigate('/', {trigger: true});
    },
    addAQuestion: function() {
        Backbone.history.navigate('questions/add', {trigger: true});
    },
    editAQuestion: function() {
        Backbone.history.navigate('questions/' + this.collection.models[0].id + '/edit', {trigger: true});
    },
    flagAQuestion: function() {
	var attributes = { flag: 1 };
	var options = {
	  success: function() {
	    $('#flagged').removeClass("hidden");
	    $('#flag-question').addClass("hidden");
	  },
	  error: function() {
	    $('.errors').html(errors.join("<br/>")).show();
	  }
	};
	this.model.save(attributes, options);
    },
    addATag: function() {
	var tag_text = prompt("How should we tag this question?", "");
	var question_id = this.model.id;
	var attributes = { question_id: this.model.id, tag: tag_text };
	var options = {
	  success: function() {
  	  },
	  error: function() {
	    $('.errors').html(errors.join("<br/>")).show();
	  }
	};
	var tag_model = new tagsModel();
	tag_model.save(attributes, options);
	this.model = new questionsModel();
	this.model.id = question_id;
	this.model.fetch({success: this.render });
    }

  });
  return questionRandomView;
});
