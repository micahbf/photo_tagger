(function (root) {
	var PT = root.PT = (root.PT || {});

	var PhotoTagging = PT.PhotoTagging = function(attributes){
		this.attributes = _.extend({}, attributes);
	};

	PhotoTagging._events = {};

	PhotoTagging.all = [];

	PhotoTagging.on = function(eventName, callback) {
		PhotoTagging._events[eventName] = PhotoTagging._events[eventName] || [];
		PhotoTagging._events[eventName].push(callback);
	};

	PhotoTagging.trigger = function (eventName) {
		if(PhotoTagging._events[eventName] !== undefined) {
			PhotoTagging._events[eventName].forEach(function(callback) {
				callback();
			})
		}
	};

	PhotoTagging.prototype.get = function(attr_name){
		return this.attributes[attr_name];
	};

	PhotoTagging.prototype.set = function(attr_name, value){
		this.attributes[attr_name] = value;
	};

	PhotoTagging.prototype.create = function(callback){
		if(this.id){
			callback(this);
			return this;
		}
		var that = this;
		$.ajax({
			type: "post",
			url: "api/photo_taggings",
			dataType: "json",
			data: { photo_tagging: this.attributes },
			success: function(data, textStatus, jqXHR){
				//that.set("id", data.id);
				that.attributes = _.extend(that.attributes, data);
				PhotoTagging.all.push(that);
				PhotoTagging.trigger("add");
				callback(that);
			}
		});
	};

	PhotoTagging.fetchByPhotoId = function(photo_id, callback){
		$.ajax({
			type: "get",
			url: "api/photos/" + photo_id + "/photo_taggings",
			success: function(data, textStatus, jqXHR){
				var photo_taggings = [];
				_.each(data, function(attrs){
					var newPhotoTagging = new PhotoTagging(attrs);
					photo_taggings.push(newPhotoTagging);
				});
				PhotoTagging.all = photo_taggings;
				callback(photo_taggings);
			}
		});
	};

	PhotoTagging.find = function(id){
		return _.find(PhotoTagging.all, function(photo_tagging){
			return photo_tagging.get("id") === id});
	}

})(this);
