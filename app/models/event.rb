class Event < ApplicationRecord

  validates :title, :text, presence: true
  validates_date :time, allow_blank: false
  validates_date :date, allow_blank: true
  validates_date :end_date, allow_blank: true

end
