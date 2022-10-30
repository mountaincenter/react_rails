class Api::V1::HomeController < ApplicationController
  def guest_sign_in
    post = Post.find_or_create_by!(
      content: "test",
      user_id: 10
    )
    render json: { post: post }
  end
end
