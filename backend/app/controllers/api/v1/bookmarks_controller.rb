class Api::V1::BookmarksController < ApplicationController
  def create
    post = Post.find(params[:post_id])
    render if post.bookmark?(current_api_v1_user)
    post.bookmark(current_api_v1_user)
    post.reload
    bookmark = post.bookmarks.find_by(user_id: current_api_v1_user)
    bookmarks = post.bookmarks
    render json: post
  end

  def destroy
    post = Bookmark.find(params[:id]).post
    render post unless post.bookmark?(current_api_v1_user)
    post.unbookmark(current_api_v1_user)
    post.reload
    render json: post
  end
end
