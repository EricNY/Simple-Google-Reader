class DashboardController < ApplicationController
  before_filter :authenticate_user!

  def index
    @articles = current_user.articles
  end

end
