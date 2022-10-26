module PostsHelper
  def render_with_hashtags(content)
    content.gsub(/[#＃][\w\p{Han}ぁ-ヶｦ-ﾟー]+/) { |word| link_to word, "/photo/hashtag/#{word.delete('#')}" }.html_safe
  end
end