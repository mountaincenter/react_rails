class Api::V1::RelationshipsController < ApplicationController

  def create
    user = User.find(params[:followed_id])
    current_api_v1_user.follow(user)
    followers = user.followers
    render json: {status: 200, user: user, followers: followers }
  end

  def destroy
    user = User.find_by(id: params[:id])
    current_api_v1_user.unfollow(user)
    followers = user.followers
    render json: { status: 200, user: user, followers: followers }
  end
end
