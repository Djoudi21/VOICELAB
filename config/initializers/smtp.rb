ActionMailer::Base.smtp_settings = {
  address: "smtp.postmark.com",
  port: 587,
  domain: 'levoicelab.gdpr.dev',
  user_name: ENV['POSTMARK_ID'],
  password: ENV['POSTMARK_ID'],
  authentication: :plain,
  enable_starttls_auto: true
}
