class Admin::EpisodesController < AdminController

  def index
    render 'index.html.erb'
  end

  def show
    render 'show.html.erb'
  end

end
