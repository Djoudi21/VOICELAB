class RequestsController < ApplicationController
  def index
    @requests = Request.all
  end

  def new
    @request = Request.new
  end

  def create
    @request = Request.new(request_params)
    @request.save
  end


  private

  def request_params
    params.require(:request).permit(:user_first_name, :user_last_name, :email, :content)
  end
end
