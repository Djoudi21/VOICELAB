class User < ApplicationRecord
  # after_create :send_thanks_email
  validates :email, :first_name, :last_name, presence: true
  validates :email, uniqueness: true

  private

  # def send_thanks_email
  #   UserMailer.thanks(self).deliver_now
  # end
end
