class PagesController < ApplicationController
  skip_before_action :authenticate_user!, only: [:home, :contact,:usecases, :how, :home_tracking]

  def home
  end

  def dashboard
  end

  def login
  end

  def transfert
  end

  def usecases
  end

  def contact
  end

  def home_tracking
  end

  def transfert_tracking
  end

  def how
  end
end
