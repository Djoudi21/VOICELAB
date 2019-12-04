class Api::V1::UsersConroller < Api::V1::BaseController
  def create
    id = alias_id(cookies)
    if id.nil?
      return "4error"
    else
      @user = User.create(user_params)
      @user.email =
        @user.alias_id = id
      return "ok"
    end
  end

  private

  def user_params
    params.require(:user).permit(:username, :lastname, :firstname, :email)
  end
end
