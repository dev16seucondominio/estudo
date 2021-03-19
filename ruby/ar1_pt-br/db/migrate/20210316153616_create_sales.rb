class CreateSales < ActiveRecord::Migration[5.2]
  def change
    create_table :sales do |t|
      t.references :product, foreign_key: true
      t.references :company, foreign_key: true
      t.integer :amount_cents
      t.integer :product_number

      t.timestamps
    end
  end
end
