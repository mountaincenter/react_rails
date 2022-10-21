class Api::V1::LikesController < ApplicationController
  def create
    post = Post.find(params[:post_id])
    render if post.like?(current_api_v1_user)
    post.like(current_api_v1_user)
    post.reload
    like = post.likes.find_by(user_id: current_api_v1_user.id)
    likes = post.likes
    render json: post
  end

  def destroy
    post = Like.find(params[:id]).post
    render post unless post.like?(current_api_v1_user)
    post.unlike(current_api_v1_user)
    post.reload
    render json: post
  end
end
