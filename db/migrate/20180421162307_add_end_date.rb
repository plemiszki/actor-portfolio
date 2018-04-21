class AddEndDate < ActiveRecord::Migration[5.0]
  def change
    add_column :events, :end_date, :date, null: false
  end
end
