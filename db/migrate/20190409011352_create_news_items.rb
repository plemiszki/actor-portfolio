class CreateNewsItems < ActiveRecord::Migration[5.2]
  def change
    create_table :news_items do |t|
      t.string :header, null: false
      t.text :text, default: ""
      t.date :date, null: false
    end
  end
end
