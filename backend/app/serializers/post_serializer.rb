class PostSerializer < ActiveModel::Serializer
  attributes :id, :content, :images, :created_at
  belongs_to :user
end
