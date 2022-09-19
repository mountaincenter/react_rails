class Api::V1::UsersController < ApplicationController
  before_action :set_user, only: %i[show update]

  def index
    users = User.where.not(id: current_api_v1_user.id)
    render json: { status: 200, uesrs: users }
  end

  def show
    render json: { status: 200, user: @user}
  end

  def update
    @user.name = user_params[:name]
    @user.profile = user_params[:profile]
    if @user.save
      render json: { status: 200, user: @user}
    else
      render json: { status: 500, message: "更新に失敗しました"}
    end
  end

  private

    def set_user
      @user = User.find(params[:id])
    end

    def user_params
      params.permit(:name, :profile)
    end

end
