class AddTime < ActiveRecord::Migration[5.0]
  def change
    add_column :events, :time, :datetime
  end
end
