ActionMailer::Base.smtp_settings = {
  address: "smtp.sendgrid.net",
  port: 587,
  domain: 'levoicelab.gdpr.dev',
  user_name: ENV['SENDGRID_USERNAME'],
  password: ENV['SENDGRID_KEY'],
  authentication: :plain,
  enable_starttls_auto: true
}
