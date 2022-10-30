class Api::V1::Auth::SessionsController < ApplicationController
  def index
    if current_api_v1_user
      render json: { status: 200, current_user: current_api_v1_user }
    else
      render json: { status: 500, message: "ユーザーが存在しません" }
    end
  end

  def guest_sign_in
    user = User.guest
    render json: { status: 200, user: user, message: "ゲストロユーザーでログインしました"}
  end
end
