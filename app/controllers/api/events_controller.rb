class Api::EventsController < AdminController

  def index
    @events = Event.upcoming
    render 'index.json.jbuilder'
  end

  def index_past
    @events = Event.past
    render 'index.json.jbuilder'
  end

  def create
    @event = Event.new(event_params)
    if @event.save
      @events = Event.upcoming
      render 'index.json.jbuilder'
    else
      render json: @event.errors.full_messages, status: 422
    end
  end

  def show
    @event = Event.find(params[:id])
    render 'show.json.jbuilder'
  end

  def update
    @event = Event.find(params[:id])
    if @event.update(event_params)
      render 'show.json.jbuilder'
    else
      render json: @event.errors.full_messages, status: 422
    end
  end

  def destroy
    @event = Event.find(params[:id]).destroy
    render json: @event, status: 200
  end

  private

  def event_params
    params[:event].permit(:date, :end_date, :title, :text, :time)
  end

end
