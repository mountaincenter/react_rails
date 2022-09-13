unless Post.exists?
  users = User.all
  users.each do |user|
    if user.id % 3 == 1
      user.posts.create!(
        content: Faker::Lorem.paragraph,
        images: [
          File.open("./public/images/cat01.png"),
        ]
      )
    elsif user.id % 3 == 2
      user.posts.create!(
        content: Faker::Lorem.paragraph,
        images: [
          File.open("./public/images/cat02.png"),
          File.open("./public/images/cat03.png")
        ]
      )
    else
      user.posts.create!(
        content: Faker::Lorem.paragraph
      )
    end
  end
end