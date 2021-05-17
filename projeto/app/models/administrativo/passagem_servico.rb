class Administrativo::PassagemServico < ApplicationRecord
  attr_accessor :validar_user_opts

  # Associations

  has_one :user_entrou, class_name: "User", foreign_key: :user_entrou_id
  has_one :user_saiu, class_name: "User", foreign_key: :user_saiu_id

  has_many :objetos, class_name: "Administrativo::PassagemServicoObjeto",
    foreign_key: :administrativo_passagem_servico_id

  accepts_nested_attributes_for :objetos, allow_destroy: true

  # Validates

  validate :validar_campos
  validate :validar_existencia_usuarios

  scope :buscar, lambda { |params|
    filtro = params[:filtro] || {}
    scoped = all

    if filtro[:q].present?
      scoped = busca_simples(filtro)
    end

    scoped.distinct
  }

  scope :busca_simples, lambda { |filtro|
    scoped = all
    sql  = []
    args = []

    q = filtro[:q]
    return scoped if q.blank?

    sql  << "(user_entrou.nome like ?)"
    args << "%#{q}%"

    scoped = scoped.where(sql.join(' OR '), *args)

    scoped
  }

  def slim_obj
    attrs = {}
    attrs[:id]             = id
    attrs[:status]         = status
    attrs[:user_saiu]      = load_user_obj(user_saiu_id)
    attrs[:user_saiu_id]   = user_saiu_id
    attrs[:user_entrou]    = load_user_obj(user_entrou_id)
    attrs[:user_entrou_id] = user_entrou_id
    attrs[:criado_em]      = created_at
    attrs
  end

  def to_frontend_obj
    attrs = slim_obj
    attrs[:atualizado_em] = updated_at
    attrs[:observacoes]   = observacoes
    attrs[:objetos]       = objetos.map(&:to_frontend_obj)
    attrs
  end

  def to_obj
    attrs = {}
    attrs[:id]    = id
    attrs[:nome]  = nome
    attrs[:email] = email
    attrs
  end

  def load_user_obj(user_id)
    if user_id.present?
      user = User.find(user_id)
      user.to_frontend_obj
    else
      return
    end

    user || {}
  end


  private

  def validar_existencia_usuarios
    unless user_saiu_id && user_entrou_id
      self.status = "Pendente"
    else
      validar_user
    end

  end

  def validar_user
    unless validar_user_opts.present?
      errors.add(:base, "É necessário preencher a senha de quem sai e quem entra para realiazar a passagem de serviço!")
    else
      user_saiu = User.find(self.user_saiu_id)
      user_entrou = User.find(self.user_entrou_id)

      unless user_saiu.verificar_senha(validar_user_opts[:user_saiu_senha])
        errors.add(:base, 'Senha errada - quem sai.')
      end

      unless user_entrou.verificar_senha(validar_user_opts[:user_entrou_senha])
        errors.add(:base, 'Senha errada - quem entra.')
      end
    end

    self.status = "Realizada" if errors.empty?

    errors.empty?
  end

  def validar_campos
    errors.add(:base, 'Quem sai não pode ser vazio.') if self.user_saiu_id.blank?

    if self.objetos.present?
      self.objetos.each do |objeto|
        if objeto[:administrativo_passagem_servico_objeto_categoria_id].blank?
          errors.add(:base, 'Selecione uma categoria para os objetos.')
        elsif objeto[:itens].blank?
          errors.add(:base, 'É necessário adicionar ao menos 1 items para salvar objetos.')
        end

      end
    end

    errors.empty?
  end

  LISTA_TIPO_DATA = [
    { key: :criado_em,        label: 'Criado em' },
    { key: :passado_em,       label: 'Passado em' }
  ]

end
