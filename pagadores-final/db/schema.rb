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

ActiveRecord::Schema.define(version: 2021_04_08_204851) do

  create_table "bancos", force: :cascade do |t|
    t.integer "codigo"
    t.string "nome"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "contas", force: :cascade do |t|
    t.string "tipo_conta"
    t.string "agencia"
    t.string "numero_conta"
    t.string "responsavel"
    t.string "doc"
    t.boolean "principal"
    t.integer "pagador_id"
    t.integer "banco_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "juridica"
    t.string "dv_conta"
    t.string "dv_agencia"
    t.index ["banco_id"], name: "index_contas_on_banco_id"
    t.index ["pagador_id"], name: "index_contas_on_pagador_id"
  end

  create_table "enderecos", force: :cascade do |t|
    t.boolean "principal"
    t.string "titulo"
    t.string "cep"
    t.string "cidade"
    t.string "logradouro"
    t.string "complemento"
    t.string "bairro"
    t.integer "pagador_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["pagador_id"], name: "index_enderecos_on_pagador_id"
  end

  create_table "pagadors", force: :cascade do |t|
    t.string "nome"
    t.string "tipo"
    t.boolean "juridica"
    t.string "sexo"
    t.boolean "deficiente"
    t.string "doc"
    t.string "rg"
    t.string "nasc"
    t.string "prof"
    t.string "email"
    t.string "emailalt"
    t.integer "iden"
    t.string "telefone"
    t.string "obs"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "razao_social"
    t.string "contato"
  end

end
