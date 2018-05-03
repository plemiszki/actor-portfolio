class PagesController < PublicController

  def home
    render 'home.html.erb'
  end

  def schedule
    @events = Event.where("time >= ?", DateTime.now.beginning_of_day).order(:time)
    render 'schedule.html.erb'
  end

  def gallery
    @images = Image.order(:order)
    render 'gallery.html.erb'
  end

end
