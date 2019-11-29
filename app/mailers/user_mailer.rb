class UserMailer < ApplicationMailer

  # Subject can be set in your I18n file at config/locales/en.yml
  # with the following lookup:
  #
  #   en.user_mailer.thanks.subject
  #
  def thanks(user)
    @user = user
    mail to: @user.email, subject: "Demande d'inscription à notre version bêta"
  end
end
