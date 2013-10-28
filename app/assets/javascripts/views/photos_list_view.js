(function (root) {
	var PT = root.PT = (root.PT || {});

	var PhotosListView = PT.PhotosListView = function () {
		this.$el = $("<div></div>");
	}

	var render = PhotosListView.prototype.render = function () {
		this.$el.empty();
		var $list = $("<ul></ul>");

		PT.Photo.all.forEach(function (photo) {
			$list.append($("<li>" + photo.get("title") + "</li>"));
		})

		this.$el.append($list);
		return this;
	}
})(this);