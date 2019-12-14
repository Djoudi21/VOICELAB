# Load the Rails application.
require_relative 'application'

# Initialize the Rails application.
Rails.application.initialize!

ActionMailer::Base.smtp_settings = {
  address: "smtp.sendgrid.net",
  port: 465,
  domain: 'levoicelab.gdpr.dev',
  user_name: ENV['SENDGRID_USERNAME'],
  password: ENV['SENDGRID_KEY'],
  authentication: :plain,
  enable_starttls_auto: true
}
