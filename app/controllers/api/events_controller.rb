class Api::EventsController < AdminController

  def index
    @events = Event.all
    render 'index.json.jbuilder'
  end

  def show
    @events = Event.where(id: params[:id])
    render 'index.json.jbuilder'
  end

  def update
    @event = Event.find(params[:id])
    if @event.update(event_params)
      @events = Event.where(id: params[:id])
      render 'index.json.jbuilder'
    else
      render json: @event.errors.full_messages, status: 422
    end
  end

  private

  def event_params
    params[:event].permit(:date, :end_date, :title, :text)
  end

end
