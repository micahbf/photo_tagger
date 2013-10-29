(function (root) {
	var PT = root.PT = (root.PT || {});

	var PhotoTagBoxView = PT.PhotoTagBoxView = function(tag, detailViewEl){
		this.tag = tag;
		this.$el = $("<div></div>");
		this.$el.css({
			position: "absolute",
			left: $('img').position().left + this.tag.get("x_pos") - 50,
			top: $("img").position().top + this.tag.get("y_pos") - 50
		})
	}

	PhotoTagBoxView.prototype.render = function(){
		var $box = $("<div class=\"photo-tag\"></div>");
		this.$el.append($box);
		var that = this;
		var user = _.find(USERS, function(user){
			user.id == that.tag.get("user_id")
		})
		var $userLabel = $("<p>" + user.username + "</p>");

		$userLabel.css({
			position: "absolute",
			left: 105,
			top: 0
		})
		this.$el.append($userLabel);
		return this;
	}

})(this);