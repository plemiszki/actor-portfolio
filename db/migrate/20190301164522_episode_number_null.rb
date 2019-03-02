class EpisodeNumberNull < ActiveRecord::Migration[5.0]
  def change
    change_column_null :episodes, :number, false
  end
end
