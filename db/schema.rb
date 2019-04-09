# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_04_09_011352) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "episodes", id: :serial, force: :cascade do |t|
    t.integer "number", null: false
    t.string "title", null: false
    t.string "url", null: false
    t.string "synopsis", null: false
    t.string "guest", null: false
    t.index ["title"], name: "index_episodes_on_title", unique: true
    t.index ["url"], name: "index_episodes_on_url", unique: true
  end

  create_table "events", id: :serial, force: :cascade do |t|
    t.string "title", null: false
    t.string "text", null: false
    t.string "image_url"
    t.datetime "time", null: false
  end

  create_table "images", id: :serial, force: :cascade do |t|
    t.string "url", null: false
    t.integer "order", null: false
  end

  create_table "news_items", force: :cascade do |t|
    t.string "header", null: false
    t.text "text", default: ""
    t.date "date", null: false
  end

  create_table "users", id: :serial, force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "email", null: false
    t.string "encrypted_password", limit: 128, null: false
    t.string "confirmation_token", limit: 128
    t.string "remember_token", limit: 128, null: false
    t.index ["email"], name: "index_users_on_email"
    t.index ["remember_token"], name: "index_users_on_remember_token"
  end

end
