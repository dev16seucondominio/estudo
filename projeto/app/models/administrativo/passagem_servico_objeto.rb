class Administrativo::PassagemServicoObjeto < ApplicationRecord
  belongs_to :administrativo_passagem_servico, class_name: "Administrativo::PassagemServico", optional: true, inverse_of: :objetos,
    foreign_key: :administrativo_passagem_servico_id

  belongs_to :administrativo_passagem_servico_objeto_categoria, optional: true, class_name: "Administrativo::PassagemServicoObjetoCategoria"

  def to_frontend_obj
    attrs = {}
    attrs[:id] = id
    attrs[:itens] = itens
    attrs[:categoria] = administrativo_passagem_servico_objeto_categoria
    attrs
  end

end
