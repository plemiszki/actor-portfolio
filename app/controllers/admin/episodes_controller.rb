class Admin::EpisodesController < AdminController

  def index
    render 'index.html.erb'
  end

  def show
    @episode = Episode.find_by_id(params[:id])
    render 'show.html.erb'
  end

end
