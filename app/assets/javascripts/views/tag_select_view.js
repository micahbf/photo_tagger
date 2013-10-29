(function (root) {
	var PT = root.PT = (root.PT || {});

	var TagSelectView = PT.TagSelectView = function(photo, event) {
		this.photo = photo;
		this.event = event;
		this.$el = $("<div></div>");
		this.$el.css({
			position: "absolute",
			left: $(event.currentTarget).position().left + event.offsetX - 50,
			top: $(event.currentTarget).position().top + event.offsetY - 50
		});
		this.$el.on("click", "li", this.selectTagOption.bind(this))
	}

	var render = TagSelectView.prototype.render = function () {
		var $box = $("<div class=\"photo-tag\"></div>");
		this.$el.append($box);
		var $userList = $(JST['photo_tag_options']());
		$userList.css({
			position: "absolute",
			left: 105,
			top: 0
		})
		this.$el.append($userList);
		return this;
	}

	var selectTagOption = TagSelectView.prototype.selectTagOption = function (event) {
		var newTagging = new PT.PhotoTagging({
			photo_id: this.photo.get("id"),
			user_id: $(event.currentTarget).data("id"),
			x_pos: this.event.offsetX,
			y_pos: this.event.offsetY
		});

		newTagging.create(function (tagging) {
			console.log(tagging);
		});

		this.$el.remove();
	}

})(this);