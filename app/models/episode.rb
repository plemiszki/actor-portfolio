class Episode < ApplicationRecord

  validates :title, :url, :synopsis, :guest, :number, presence: true
  validates_numericality_of :number
  validates :title, :url, uniqueness: true

end
