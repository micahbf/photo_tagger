(function (root) {
	var PT = root.PT = (root.PT || {});

	var PhotoFormView = PT.PhotoFormView = function(){
		this.$el = $("<div></div>");
		this.$el.on("submit", this.submit);
	};

	PhotoFormView.prototype.render = function(){
		var formFn = JST["photo_form"];

		this.$el.append(formFn());
		return this;
	};

	PhotoFormView.prototype.submit = function(event){
		event.preventDefault();
		var photoData = $(event.target).serializeJSON();
		var photo = new PT.Photo(photoData["photo"]);
		photo.create(function(){
			event.target.reset();
		})
	}
})(this);