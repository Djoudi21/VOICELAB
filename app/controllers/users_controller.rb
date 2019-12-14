class UsersController < ApplicationController
  # skip_before_action :authenticate_user!, only: [:new, :create]
  protect_from_forgery
  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    if @user.save
      # Deliver the signup email
      UserMailer.thanks(@user).deliver_now
      @user = User.new
      respond_to do |format|
        format.html { redirect_to root_path }
        format.js
      end
      # redirect_to(@user, :notice => 'User created')
    else
      respond_to do |format|
        format.html { render 'users/new' }
        format.js
      end
    end
  end

  private

  def user_params
    params.require(:user).permit(:email, :first_name, :last_name)
  end
end
