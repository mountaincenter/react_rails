class Api::V1::ChatRoomsController < ApplicationController
  before_action :set_chat_room, only: %i[show]
  # def create
  #   chat_room = ChatRoom.create
  #   other_user = ChatRoomUser.new(chat_room_user_params)
  #   other_user.chat_room_id = chat_room.id
  #   current_user = ChatRoomUser.new(user_id: current_api_v1_user.id, chat_room_id: chat_room.id)
  #   if other_user.save
  #     render json: { status: 200, other_user: other_user, current_chat_room_user: current_user }
  #   else
  #     render json: { status: 500, message:"登録に失敗しました" }
  #   end
  # end

  # def create
  #   chat_room = ChatRoom.create
  #   2.times do |chat_room_user|
  #     chat_room_user = ChatRoomUser.new(chat_room_user_params)
  #     chat_room_user.chat_room_id = chat_room.id
  #     chat_room_user.save
  #   end
  #   chat_room_users = ChatRoomUser.all
  #   render json: { status: 200, chat_room: chat_room, chat_room_users: chat_room_users}
  # end

  def create
    chat_room = ChatRoom.create
    ChatRoomUser.create(chat_room_id: chat_room.id, user_id: current_api_v1_user.id)
    ChatRoomUser.create(chat_room_user_params.merge(chat_room_id: chat_room.id))
    render json: {chat_room: chat_room, chat_room_user: ChatRoomUser.all}
  end

  def index
    chat_rooms = []
    current_api_v1_user.chat_room.order("created_at DESC").each do |chat_room|
      chat_rooms << {
        chat_room: chat_room,
        other_user: chat_room.users.where.not(id: current_api_v1_user.id)[0],
        last_message: chat_room.messages[-1]
      }
    end
    render json: { status: 200, chat_rooms: chat_rooms }
  end

  def show
    @chat_room = ChatRoom.find(params[:id])
    other_user = @chat_room.users.where.not(id: current_api_v1_user.id)[0]
    messages = @chat_room.messages.order("created_At ASC")
    render json: { status: 200, other_user: other_user, messages: messages }
  end

  # def show
  #   @chat_room = ChatRoom.find(params[:id])
  #   @messages = @chat_room.messages.all
  #   @message = Message.new
  #   @chat_room_users = @chat_room.chat_room_users
  #   @another_chat_room_user = @chat_room_users.where.not(user_id: current_api_v1_user.id).first
  #   render json: { status: 200, chat_room: @chat_room, messages: @messages, message: @message, chat_room_user: @chat_room_users, another_chat_room_user: @another_chat_room_user}
  # end

  private
    def set_chat_room_user
      @chat_room = ChatRoom.find(params[:id])
    end

    def chat_room_user_params
      params.permit(:user_id)
    end
end
