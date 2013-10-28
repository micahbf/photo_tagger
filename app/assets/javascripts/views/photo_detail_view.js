(function (root) {
	var PT = root.PT = (root.PT || {});

	var PhotoDetailView = PT.PhotoDetailView = function(photo){
		this.$el = $("<div></div>");
		this.photo = photo;
		this.$el.on("click", "img", this.onPhotoClick.bind(this));
		this.$el.on("click", "a.back", PT.showPhotosIndex)
	}

	PhotoDetailView.prototype.render = function(){
		var renderedContent = JST["photo_detail"]({photo: this.photo});
		this.$el.append(renderedContent);
		return this;
	}

	PhotoDetailView.prototype.onPhotoClick = function(event){
	}

})(this);