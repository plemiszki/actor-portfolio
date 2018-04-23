class PagesController < PublicController

  def home
    render 'home.html.erb'
  end

  def schedule
    @events = Event.all.order(:time)
    render 'schedule.html.erb'
  end

end
