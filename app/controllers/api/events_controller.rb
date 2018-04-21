class Api::EventsController < AdminController

  def index
    @events = Event.all
    render 'index.json.jbuilder'
  end

  private

  def event_params
    params[:event].permit(:date, :title, :text)
  end

end
