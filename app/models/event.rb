class Event < ApplicationRecord

  validates :title, :text, presence: true
  validates_date :time, allow_blank: false

  def self.upcoming
    where('time > ?', DateTime.now)
  end
end
