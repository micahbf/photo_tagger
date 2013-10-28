class PhotoTagging < ActiveRecord::Base
  attr_accessible :photo_id, :user_id, :x_pos, :y_pos
  validates :photo_id, :user_id, presence: true
  validates :photo_id, uniqueness: {scope: :user_id}

  belongs_to :photo
  belongs_to :user
end
