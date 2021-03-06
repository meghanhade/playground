var DeveloperPlayground = DeveloperPlayground || {};

DeveloperPlayground.DownloadView = Backbone.View.extend({
	el: '#download-bar',
	
	template: _.template( $('#download-bar-template').html() ),

	events: {
        'click .btn' : 'submit',
    },

    //  if (feature.get('display') !== false) {


	render: function() {
		renderedHtml = this.template();
		this.$el.html(renderedHtml);
        $("#download-bar").hide();
		return this;
		},

	setCollection: function(options){
        this.collection = options.collection;
    },

	submit: function(event) {

		if (this.collection.url.split("/").pop() == "operators.json?per_page=5000" ) {
			url = this.collection.url + "?onestop_id=" + this.collection.findWhere({display: true}).get("onestop_id")+'&per_page=5000';
		} else {
			url = this.collection.url;
		}

		// if only one operator is visible, then set url parameter to include that operator identifier
        
		if (event.target.id == "csv") {
			url = url.replace(".json", ".csv");
			// analytics event tracker:
            ga('send', 'event', 'download data', 'csv', url);
		} else if (event.target.id == "json") {
			var blob = new Blob([JSON.stringify(this.collection.toJSON())], {type: "application/json;charset=utf-8"});
			saveAs(blob, "download.json");
			// analytics event tracker:
            ga('send', 'event', 'dowload data', 'json', url);
		}

		window.open(url, '_blank');

	}


 });
