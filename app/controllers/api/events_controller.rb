class Api::EventsController < AdminController

  def index
    @events = Event.all
    render 'index.json.jbuilder'
  end

  def create
    @event = Event.new(event_params)
    if @event.save
      @events = Event.all
      render 'index.json.jbuilder'
    else
      render json: @event.errors.full_messages, status: 422
    end
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

  def destroy
    Event.find(params[:id]).destroy
    @events = Event.where(id: params[:id])
    render 'index.json.jbuilder'
  end

  private

  def event_params
    params[:event].permit(:date, :end_date, :title, :text, :time)
  end

end
