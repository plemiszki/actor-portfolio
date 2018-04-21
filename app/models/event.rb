class Event < ApplicationRecord

  validates :title, :text, presence: true
  validates_date :date, allow_blank: false

end
