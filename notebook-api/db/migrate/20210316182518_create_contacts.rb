class CreateContacts < ActiveRecord::Migration[5.2]
  def change
    create_table :contacts do |t|
      t.string :first_name
      t.string :email
      t.date :birthdate

      t.timestamps
    end
  end
end
