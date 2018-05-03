class Image < ApplicationRecord

  validates :url, :order, presence: true

end
