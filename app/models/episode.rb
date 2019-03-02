class Episode < ApplicationRecord

  validates :title, :url, :synopsis, :guest, :number, presence: true
  validates :title, :url, uniqueness: true

end
