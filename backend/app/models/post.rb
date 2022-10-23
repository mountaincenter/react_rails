class Post < ApplicationRecord
  belongs_to :user
  mount_uploaders :images, ImageUploader
  validates :content, presence: true, length: { maximum: 140 }
  has_many :likes, dependent: :destroy
  has_many :comments, dependent: :destroy
  has_many :bookmarks, dependent: :destroy

  def like(user)
    likes.create(user_id: user.id)
  end

  def unlike(user)
    likes.find_by(user_id: user.id).destroy
  end

  def like?(user)
    likes.where(user_id: user.id).exists?
  end

  def bookmark(user)
    bookmarks.create(user_id: user.id)
  end

  def unbookmark(user)
    bookmarks.find_by(user_id: user.id).destroy
  end

  def bookmark?(user)
    bookmarks.where(user_id: user.id).exists?
  end
end
