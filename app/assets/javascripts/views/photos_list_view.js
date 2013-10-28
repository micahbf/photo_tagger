(function (root) {
	var PT = root.PT = (root.PT || {});

	var PhotosListView = PT.PhotosListView = function () {
		this.$el = $("<div></div>");
		PT.Photo.on("add", this.render.bind(this));
		this.$el.on("click", "a", this.showDetail.bind(this));
	}

	var render = PhotosListView.prototype.render = function () {
		this.$el.empty();
		var $list = $("<ul></ul>");

		PT.Photo.all.forEach(function (photo) {
			var link = "<a href=\"#\" data-id=\"" + photo.get("id") + "\">" + photo.get("title") + "</a>";
			$list.append($("<li>" + link + "</li>"));
		})

		this.$el.append($list);
		return this;
	}

	PhotosListView.prototype.showDetail = function(event){
		event.preventDefault();

		PT.showPhotoDetail(PT.Photo.find($(event.currentTarget).data("id")));
	}

})(this);