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
      # UserMailer.thanks(@user).deliver
      redirect_to root_path
      # redirect_to(@user, :notice => 'User created')
    else
      render :new
    end
  end

  private

  def user_params
    params.require(:user).permit(:email, :first_name, :last_name)
  end
end
