class Api::V1::UsersController < ApplicationController
  before_action :set_user, only: %i[show update following followers]

  def index
    users = User.where.not(id: current_api_v1_user.id)
    render json: { status: 200, uesrs: users }
  end

  def show
    @user = User.find(params[:id])
    @current_user = ChatRoomUser.where(user_id: current_api_v1_user.id)
    @other_user = ChatRoomUser.where(user_id: @user.id)
    unless @user.id == current_api_v1_user.id
      @current_user.each do |current|
        @other_user.each do |other|
          if current.chat_room_id == other.chat_room_id
            @is_room = true
          end
        end
      end
    end

    render json: { status: 200, user: @user, is_room: @is_room }
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

  def following
    @users = @user.following
    render json: { status: 200, users: @users}
  end

  def followers
    @users = @user.followers
    render json: { status: 200, users: @users}
  end

  private

    def set_user
      @user = User.find(params[:id])
    end

    def user_params
      params.permit(:name, :profile)
    end

end
