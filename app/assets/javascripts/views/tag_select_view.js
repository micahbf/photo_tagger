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

	}

	var render = TagSelectView.prototype.render = function () {
		var $box = $("<div class=\"photo-tag\"></div>");
		this.$el.append($box);
		return this;
	}

})(this);