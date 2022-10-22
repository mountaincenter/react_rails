class Api::V1::CommentsController < ApplicationController
  before_action :authenticate_user!, only: %i[create]

  def show
    comment = Comment.where(post_id: params[:id]).to_json(include: %i[user])
    render json: comment
  end

  def create
    comment = current_api_v1_user.build(comment_params)
    if commnet.save
      render json: commnet.to_json(include: %i[user])
    else
      render json: comment.errors, status: :unprocessable_entity
    end
  end

  private

  def comment_params
    params.permit(:content, :post_id)
  end

end
