class Api::V1::UsersController < ApplicationController
  before_action :set_user, only: %i[show update]

  def index
    users = User.where.not(id: current_api_v1_user.id)
    render json: { status: 200, uesrs: users }
  end

  def show
    @current_chat_room_user = ChatRoomUser.where(user_id: current_api_v1_user.id)
    @another_chat_room_user = ChatRoomUser.where(user_id: @user.id)
    unless @user.id == current_api_v1_user.id
      @current_chat_room_user.each do |current|
        @another_chat_room_user.each do |another|
          if current.chat_room_id = another.chat_room_id
            @is_chat_room = true
            @chat_room_id = current.chat_room_id
          end
        end
      end
      unless @is_chat_room
        @chat_room = ChatRoom.new
        @chat_room_user = ChatRoomUser.new
      end
    end
    render json: { status: 200, user: @user, chat_room: @chat_room, chat_room_user: @chat_room_user }
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
