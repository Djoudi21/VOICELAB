require "base64"
require "json"
require 'hmac-sha1'

module ApplicationHelper
  def alias_id(cookies)
    # Get the session secret for secure cookie
    secret = ENV["ALIAS_SESSION_KEY"]
    if secret == nil then
      raise "environment variable 'ALIAS_SESSION_KEY' had not been initialized"
    end

    # Read the cookie 'session' and 'session.sig' set by alias-js
    cookie_b64 = cookies[:session]
    cookie_sig_b64 = cookies["session.sig"]

    # If the cookies are unset, returns nil
    if cookie_b64 == nil or cookie_sig_b64 == nil then
      return nil
    end

    # check cryptographic signature of cookie
    hmac = HMAC::SHA1.new(secret)
    hmac.update("session=" + cookie_b64)
    hmac = Base64.encode64(hmac.digest)
    hmac.sub! "/", "_"
    hmac.sub! "+", "-"
    hmac.sub! "=", ""
    hmac.sub! "\n", ""

    # if cookie had been forged, returns nil
    if hmac != cookie_sig_b64 then
      return nil
    end

    # cookie is safe! unserialize it
    cookie = JSON.parse(Base64.decode64(cookie_b64))

    # get the user's public key, if defined
    publicKey = cookie['publicKey']
    if publicKey == nil then
      return nil
    end

    return publicKey['__bytes']
  end
end
