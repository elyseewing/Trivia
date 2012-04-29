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
    initialize: function(id) {
      this.collection = new questionsCollection();
      _.bindAll(this, 'render');
      _.bindAll(this, 'editAQuestion');
      _.bindAll(this, 'flagAQuestion');
      _.bindAll(this, 'addATag');
      _.bindAll(this, 'removeATag');
      if (id == undefined) {
        this.collection.fetch({ success: this.render });
      }
      else {
	this.model = new questionsModel();
	this.model.id = id;
	this.model.fetch({ success: this.render });
      }
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
      "click #add-filter":"addAFilter",
      "click #add-tag":"addATag",
      "click .tag":"removeATag"
    },

    nextQuestion: function() { 
        Backbone.history.navigate('/', {trigger: true});
    },
    addAQuestion: function() {
        Backbone.history.navigate('questions/add/', {trigger: true});
    },
    editAQuestion: function() {
	Backbone.history.navigate('questions/' + this.model.id + '/edit/', {trigger: true});
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
    addAFilter: function() {
      	var tag_text = prompt("What tag do you want to apply?", "");
	if (tag_text) {
	  window.sessionStorage.setItem("tag", tag_text);
	  window.location.reload();
	}
    },
    addATag: function() {
	var tag_text = prompt("How should we tag this question?", "");
	if (tag_text)
	{
	  var question_id = this.model.id;
	  var attributes = { question_id: this.model.id, tag: tag_text };
	  var options = {
	    success: function() {
	      this.model = new questionsModel();
	      this.model.id = question_id;
	      this.model.fetch({ 
	        success: function() {
		  var data = {
        	    model: this.model,
        	    $: $,
        	    _ : _
  		  };
      		  var compiledTemplate = _.template(questionRandomTemplate, data);
      		  $("body").html(compiledTemplate);
	        }
	      });
    	    },
  	    error: function() {
	      alert("Hmmm, something went wrong.");
	    }
	  };
	  var tag_model = new tagsModel();
	  tag_model.save(attributes, options);
	}
    },
    removeATag: function(e) {
	var yes = confirm("Are you sure you want to remove this tag?");
	if (yes == true)
	{
	  var clickedEl = $(e.currentTarget);
	  var id = clickedEl.attr("id");
	  if (id != "applied")
	  {
	    var question_id = this.model.id;	

   	    var options = {
             success: function() {
	        var reload_model = new questionsModel();
	        reload_model.id = question_id;
                reload_model.fetch({ 
	          success: function() {
                    var data = {
                      model: reload_model,
                      $: $,
                      _ : _
                    };
                    var compiledTemplate = _.template(questionRandomTemplate, data);
                      $("body").html(compiledTemplate);
                  } 
    	        });
              },
              error: function() {
                alert("Tag could not be removed.");
              }
            };
	    var tag_model = new tagsModel();
	    tag_model.id = id; 
	    tag_model.fetch({ success: tag_model.destroy(options) });
	  }
	  else {
	    window.sessionStorage.setItem("tag", "");
	    window.location.reload();
	  }
	}
    }   
  });
  return questionRandomView;
});
