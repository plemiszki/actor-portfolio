class Admin::NewsItemsController < AdminController

  def index
    render 'index.html.erb'
  end

  def show
    @news_item = NewsItem.find_by_id(params[:id])
    render 'show.html.erb'
  end

end
