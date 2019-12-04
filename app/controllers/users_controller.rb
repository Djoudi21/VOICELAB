class UsersController < ApplicationController
  # skip_before_action :authenticate_user!, only: [:new, :create]
  # def new
  #   @user = User.new
  # end

  # def create
  #   @user = User.new(user_params)
  #   @user.save
  # end

  # private

  # def user_params
  #   params.require(:user).permit(:email, :first_name, :last_name)
  # end
end
