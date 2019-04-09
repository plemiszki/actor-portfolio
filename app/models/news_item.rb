class NewsItem < ApplicationRecord

  validates :header, presence: true
  validates_date :date, allow_blank: false

end
