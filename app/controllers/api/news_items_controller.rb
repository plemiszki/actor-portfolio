class Api::NewsItemsController < AdminController

  def index
    @news_items = NewsItem.all
    render 'index.json.jbuilder'
  end

  def create
    @news_item = NewsItem.new(news_item_params)
    if @news_item.save
      @news_items = NewsItem.all
      render 'index.json.jbuilder'
    else
      render json: @news_item.errors.full_messages, status: 422
    end
  end

  def show
    @news_item = NewsItem.find(params[:id])
    render 'show.json.jbuilder'
  end

  def update
    @news_item = NewsItem.find(params[:id])
    if @news_item.update(news_item_params)
      render 'show.json.jbuilder'
    else
      render json: @news_item.errors.full_messages, status: 422
    end
  end

  def destroy
    @news_item = NewsItem.find(params[:id]).destroy
    render json: @news_item, status: 200
  end

  private

  def news_item_params
    params[:news_item].permit(:header, :text, :date)
  end

end
