class AddEpisodeDefaults < ActiveRecord::Migration[5.0]
  def change
    change_column_null :episodes, :title, false
    change_column_null :episodes, :synopsis, false
    change_column_null :episodes, :url, false
    change_column_null :episodes, :guest, false
  end
end
