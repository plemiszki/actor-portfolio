class PagesController < PublicController

  def home
    render 'home.html.erb'
  end

  def schedule
    @events = Event.where("time > ?", DateTime.now.end_of_day).order(:time)
    render 'schedule.html.erb'
  end

end
