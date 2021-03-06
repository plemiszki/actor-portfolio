class CreateEvents < ActiveRecord::Migration
  def change
    create_table :events do |t|
      t.string :title, null: false
      t.string :text, null: false
      t.date :date, null: false
      t.string :image_url
    end
  end
end
