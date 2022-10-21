class PostSerializer < ActiveModel::Serializer
  attributes :id, :content, :images, :likes, :created_at
  belongs_to :user
  has_many :likes
end
