(function (root) {
	var PT = root.PT = (root.PT || {});

	var PhotoDetailView = PT.PhotoDetailView = function(photo){
		this.$el = $("<div></div>");
		this.photo = photo;
		this.$el.on("click", "img", this.popTagSelectView.bind(this));
		this.$el.on("click", "a.back", PT.showPhotosIndex)
	}

	PhotoDetailView.prototype.render = function(){
		var renderedContent = JST["photo_detail"]({photo: this.photo});
		this.$el.append(renderedContent);

		var that = this;
		PT.PhotoTagging.fetchByPhotoId(this.photo.get("id"), function(tags){
			_.each(tags, function(tag){
				that.$el.append(new PT.PhotoTagBoxView(tag).render().$el);
			})
		});

		return this;
	}

	PhotoDetailView.prototype.popTagSelectView = function(event){
		var tagView = new PT.TagSelectView(this.photo, event);
		this.$el.append(tagView.render().$el);
	}

})(this);