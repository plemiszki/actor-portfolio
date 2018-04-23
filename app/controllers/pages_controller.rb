class PagesController < ApplicationController

  def home
    render 'home.html.erb'
  end

  def schedule
    @events = Event.all.order(:date)
    render 'schedule.html.erb'
  end

end
