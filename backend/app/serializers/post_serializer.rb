class PostSerializer < ActiveModel::Serializer
  attributes :id, :content, :images, :likes,:likes_count, :created_at
  belongs_to :user
  has_many :likes

  def likes_count
    object.likes.count
  end
end
