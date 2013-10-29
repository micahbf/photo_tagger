(function (root) {
	var PT = root.PT = (root.PT || {});

	var Photo = PT.Photo = function(attributes){
		this.attributes = _.extend({}, attributes);
	};

	Photo._events = {};

	Photo.all = [];

	Photo.on = function(eventName, callback) {
		Photo._events[eventName] = Photo._events[eventName] || [];
		Photo._events[eventName].push(callback);
	};

	Photo.trigger = function (eventName) {
		Photo._events[eventName].forEach(function(callback) {
			callback();
		})
	};

	Photo.prototype.get = function(attr_name){
		return this.attributes[attr_name];
	};

	Photo.prototype.set = function(attr_name, value){
		this.attributes[attr_name] = value;
	};

	Photo.prototype.create = function(callback){
		if(this.id){
			callback(this);
			return this;
		}
		var that = this;
		$.ajax({
			type: "post",
			url: "api/photos",
			dataType: "json",
			data: { photo: this.attributes },
			success: function(data, textStatus, jqXHR){
				//that.set("id", data.id);
				that.attributes = _.extend(that.attributes, data);
				Photo.all.push(that);
				Photo.trigger("add");
				callback(that);
			}
		});
	};

	Photo.fetchByUserId = function(user_id, callback){
		$.ajax({
			type: "get",
			url: "api/users/" + user_id + "/photos",
			success: function(data, textStatus, jqXHR){
				var photos = [];
				_.each(data, function(attrs){
					var newPhoto = new Photo(attrs);
					photos.push(newPhoto);
				});
				Photo.all = photos;
				callback(photos);
			}
		});
	};

	Photo.find = function(id){
		return _.find(Photo.all, function(photo){return photo.get("id") === id});
	}

})(this);
