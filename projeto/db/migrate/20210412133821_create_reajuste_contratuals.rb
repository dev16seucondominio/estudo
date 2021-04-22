class CreateReajusteContratuals < ActiveRecord::Migration[5.2]
  def change
    create_table :reajuste_contratuals do |t|
      t.boolean :reajustar
      t.string :tipo
      t.string :correcao
      t.string :valor
      t.boolean :valor_percentual
      t.integer :frequencia
      t.string :periodo
      t.string :ultimo_reajuste
      t.boolean :notificar
      t.references :pagador, foreign_key: true

      t.timestamps
    end
  end
end
