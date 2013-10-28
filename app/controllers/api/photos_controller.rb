class Api::PhotosController < ApplicationController
  def create
    @photo = Photo.new(params[:photo])
    if @photo.save
      render :json => @photo
    else
      render :json => @photo.errors.full_messages, status: 422
    end
  end

  def index
    @photos = User.find(params[:user_id]).photos
    responds_to do |format|
      format.html
      format.json { render json: @photos }
    end
  end
end
