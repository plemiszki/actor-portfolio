class Event < ApplicationRecord

  validates :title, :text, presence: true
  validates :time, uniqueness: true
  validates_date :time, allow_blank: false

  scope :upcoming, -> { where('time > ?', DateTime.now) }
  scope :past, -> { where('time < ?', DateTime.now) }

end
