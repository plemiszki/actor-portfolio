class Api::EpisodesController < AdminController

  def index
    @episodes = Episode.all
    render 'index.json.jbuilder'
  end

  def create
    @episode = Episode.new(episode_params)
    if @episode.save
      @episodes = Episode.all
      render 'index.json.jbuilder'
    else
      render json: @episode.errors.full_messages, status: 422
    end
  end

  def show
    @episode = Episode.find(params[:id])
    render 'show.json.jbuilder'
  end

  def update
    @episode = Episode.find(params[:id])
    if @episode.update(episode_params)
      render 'show.json.jbuilder'
    else
      render json: @episode.errors.full_messages, status: 422
    end
  end

  def destroy
    @episode = Episode.find(params[:id]).destroy
    render json: @episode, status: 200
  end

  private

  def episode_params
    params[:episode].permit(:title, :url, :guest, :number, :synopsis)
  end

end
