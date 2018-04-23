class RemoveOldDateFields < ActiveRecord::Migration[5.0]
  def change
    change_column_null :events, :time, false
    remove_column :events, :date
    remove_column :events, :end_date
  end
end
