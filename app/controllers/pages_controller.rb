class PagesController < PublicController

  after_action :change_x_frame, only: :onwords

  def home
    @news_items = NewsItem.all.order(date: :desc).limit(5)
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

  def onwords
    @episodes = Episode.order(:number)
    render 'onwords.html.erb', layout: 'application'
  end

  private

  def change_x_frame
    response.headers.except! 'X-Frame-Options'
  end

end
