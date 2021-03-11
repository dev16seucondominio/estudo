module UsersBackofficeHelper
  def avatar_url
    avatar = current_user.user_profile.avatar
    avatar.attached? ? avatar : "https://colorlib.com/polygon/gentelella/images/img.jpg"
  end
end
