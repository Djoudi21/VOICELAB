class User < ApplicationRecord
  after_create :send_thanks_email
  validates :email, uniqueness: true

  private

  def send_thanks_email
    UserMailer.thanks(self).deliver_now
  end
end
