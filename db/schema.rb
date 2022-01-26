# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2022_01_26_223203) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "client_accounts", force: :cascade do |t|
    t.boolean "recieve_notifications"
    t.float "balance"
    t.integer "status"
    t.bigint "user_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_client_accounts_on_user_id"
  end

  create_table "course_sections", force: :cascade do |t|
    t.date "start_date"
    t.date "end_date"
    t.integer "meeting_day"
    t.time "start_time"
    t.time "end_time"
    t.integer "status"
    t.integer "setting"
    t.bigint "user_id", null: false
    t.bigint "course_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["course_id"], name: "index_course_sections_on_course_id"
    t.index ["user_id"], name: "index_course_sections_on_user_id"
  end

  create_table "courses", force: :cascade do |t|
    t.integer "name"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "items", force: :cascade do |t|
    t.string "name"
    t.float "price"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "item_type"
  end

  create_table "order_items", force: :cascade do |t|
    t.bigint "item_id", null: false
    t.bigint "order_id", null: false
    t.integer "quantity"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "discount"
    t.index ["item_id"], name: "index_order_items_on_item_id"
    t.index ["order_id"], name: "index_order_items_on_order_id"
  end

  create_table "orders", force: :cascade do |t|
    t.bigint "client_account_id", null: false
    t.float "total"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.date "purchase_date"
    t.index ["client_account_id"], name: "index_orders_on_client_account_id"
  end

  create_table "payments", force: :cascade do |t|
    t.float "amount"
    t.bigint "client_account_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["client_account_id"], name: "index_payments_on_client_account_id"
  end

  create_table "student_sections", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "student_id", null: false
    t.bigint "course_section_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["course_section_id"], name: "index_student_sections_on_course_section_id"
    t.index ["student_id"], name: "index_student_sections_on_student_id"
    t.index ["user_id"], name: "index_student_sections_on_user_id"
  end

  create_table "students", force: :cascade do |t|
    t.integer "gender"
    t.date "birth_date"
    t.bigint "client_account_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "first_name"
    t.string "last_name"
    t.index ["client_account_id"], name: "index_students_on_client_account_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "first_name"
    t.string "last_name"
    t.string "password_digest"
    t.string "primary_email"
    t.string "primary_phone"
    t.string "address"
    t.string "city"
    t.string "state"
    t.string "zip_code"
    t.integer "role"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  add_foreign_key "client_accounts", "users"
  add_foreign_key "course_sections", "courses"
  add_foreign_key "course_sections", "users"
  add_foreign_key "order_items", "items"
  add_foreign_key "order_items", "orders"
  add_foreign_key "orders", "client_accounts"
  add_foreign_key "payments", "client_accounts"
  add_foreign_key "student_sections", "course_sections"
  add_foreign_key "student_sections", "students"
  add_foreign_key "student_sections", "users"
  add_foreign_key "students", "client_accounts"
end
