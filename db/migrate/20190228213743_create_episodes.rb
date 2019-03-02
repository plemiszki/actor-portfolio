class CreateEpisodes < ActiveRecord::Migration[5.0]
  def change
    create_table :episodes do |t|
      t.integer :number
      t.string :title
      t.string :url
      t.string :synopsis
      t.string :guest
    end

    add_index :episodes, :title, unique: true
    add_index :episodes, :url, unique: true
  end
end
