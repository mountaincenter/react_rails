class Post < ApplicationRecord
  belongs_to :user
  mount_uploader :images, ImageUploader
  validates :content, presence: true, length: { maximum: 140 }
end
