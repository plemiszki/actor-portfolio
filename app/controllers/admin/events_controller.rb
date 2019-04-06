class Admin::EventsController < AdminController

  def index
    render 'index.html.erb'
  end

  def show
    @event = Event.find_by_id(params[:id])
    render 'show.html.erb'
  end

end
