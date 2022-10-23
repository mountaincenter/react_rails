class Api::V1::CommentsController < ApplicationController

  def show
    comments = Comment.where(post_id: params[:id])
    # comment = Comment.find(params[:id]).to_json(include: %i[user])
    render json: comments
  end

  def create
    comment = Comment.create(comment_params)
    render json: comment
  end

  private

  def comment_params
    params.permit(:content, :post_id, :user_id)
  end

end
