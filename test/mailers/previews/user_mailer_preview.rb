# Preview all emails at http://localhost:3000/rails/mailers/user_mailer
class UserMailerPreview < ActionMailer::Preview

  # Preview this email at http://localhost:3000/rails/mailers/user_mailer/thanks
  def thanks
    user = User.first
    UserMailer.thanks(user)
  end

end
