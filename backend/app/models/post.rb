class Post < ApplicationRecord
  belongs_to :user
  mount_uploaders :images, ImageUploader
  validates :content, presence: true, length: { maximum: 140 }
  has_many :likes, dependent: :destroy
  has_many :comments, dependent: :destroy
  has_many :bookmarks, dependent: :destroy

  has_many :post_hashtag_relations
  has_many :hashtags, through: :post_hashtag_relations

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

  after_create do
    post = Post.find_by(id: self.id)
    hashtags = self.content.scan(/[#＃][\w\p{Han}ぁ-ヶｦ-ﾟー]+/)
    post.hashtags = []
    hashtags.uniq.map do |hashtag|
      tag = Hashtag.find_or_create_by(hashname: hashtag.downcase.delete('#'))
      post.hashtags << tag
    end
  end

  before_update do
    post = Post.find_by(self.id)
    post.hashtags.clear
    hashtags = self.content.scan(/[#＃][\w\p{Han}ぁ-ヶｦ-ﾟー]+/)
    hashtags.uniq.map do |hashtag|
      tag = Hashtag.find_or_create_by(hashname: hashtag.downcase.delete('#'))
      post.hashtags << tag
    end
  end
end
