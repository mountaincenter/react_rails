class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :email
  belongs_to :post
end
