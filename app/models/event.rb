class Event < ApplicationRecord

  validates :title, :text, presence: true
  validates_date :date, allow_blank: false
  validates_date :end_date, allow_blank: false

end
