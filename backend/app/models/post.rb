class Post < ApplicationRecord
  belongs_to :user
  mount_uploaders :images, ImageUploader
  validates :content, presence: true, length: { maximum: 140 }
end
