class PostSerializer < ActiveModel::Serializer
  attributes :id, :content, :images, :likes, :likes_count, :bookmarks, :created_at
  belongs_to :user
  has_many :likes
  has_many :bookmarks

  def likes_count
    object.likes.count
  end
end
