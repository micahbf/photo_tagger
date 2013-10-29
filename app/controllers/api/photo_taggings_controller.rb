class Api::PhotoTaggingsController < ApplicationController
  before_filter :ensure_current_user_is_owner, only: [:create]

  def index
    @taggings = Photo.find(params[:photo_id]).photo_taggings
    render json: @taggings
  end

  def create
    @tagging = PhotoTagging.new(params[:photo_tagging])
    if @tagging.save
      render json: @tagging
    else
      render json: @tagging.errors.full_messages, status: 422
    end
  end

  private

  def ensure_current_user_is_owner
    owner_id = Photo.find(params[:photo_tagging][:photo_id]).owner_id
    head 401 if (!current_user || current_user.id != owner_id)
  end
end
