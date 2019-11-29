class User < ApplicationRecord
  after_create :send_thanks_email


  private

  def send_thanks_email
    UserMailer.thanks(self).deliver_now
  end
end
