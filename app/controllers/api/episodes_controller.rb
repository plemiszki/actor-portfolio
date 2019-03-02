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
    @episodes = Episode.where(id: params[:id])
    render 'index.json.jbuilder'
  end

  def update
    @episode = Episode.find(params[:id])
    if @episode.update(episode_params)
      @episodes = Episode.where(id: params[:id])
      render 'index.json.jbuilder'
    else
      render json: @episode.errors.full_messages, status: 422
    end
  end

  def destroy
    Episode.find(params[:id]).destroy
    @episodes = Episode.where(id: params[:id])
    render 'index.json.jbuilder'
  end

  private

  def episode_params
    params[:episode].permit(:title, :url, :guest, :number, :synopsis)
  end

end
