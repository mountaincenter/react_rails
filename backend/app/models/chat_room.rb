class ChatRoom < ApplicationRecord
  has_many :chat_room_users, dependenet: :destroy
  has_many :messages, dependent: :destroy
end
