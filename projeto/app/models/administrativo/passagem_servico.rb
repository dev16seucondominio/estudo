class Administrativo::PassagemServico < ApplicationRecord
  attr_accessor :validar_user_opts
  attr_accessor :micro_update_opts

  # Associations

  belongs_to :user_saiu, class_name: "User", foreign_key: :user_saiu_id
  belongs_to :user_entrou, class_name: "User", foreign_key: :user_entrou_id, optional: true

  has_many :objetos, class_name: "Administrativo::PassagemServicoObjeto",
    foreign_key: :administrativo_passagem_servico_id

  accepts_nested_attributes_for :objetos, allow_destroy: true

  # Validates
  before_validation :set_status
  validate :validar_campos
  validate :validar_existencia_usuarios

  scope :buscar, lambda { |params|
    filtro = params[:filtro] || {}
    scoped = all

    scoped = scoped.where.not("status = 'Desativada'")

    if filtro[:q].present?
      scoped = busca_simples(filtro)
    elsif filtro.present?
      scoped = busca_avancada(filtro)
    end

    scoped.distinct
  }

  scope :busca_simples, lambda { |filtro|
    scoped = all
    sql  = []
    args = []

    q = filtro[:q]
    return scoped if q.blank?


    sql  << "(users.nome like ?)"
    args << "%#{q}%"

    sql  << "(user_entrous_administrativo_passagem_servicos.nome like ?)"
    args << "%#{q}%"



    scoped = scoped.left_outer_joins(:user_saiu, :user_entrou)
    # sql << "status = 'Pendente' OR status = 'Realizada'"
    scoped = scoped.where(sql.join(' OR '), *args)


    scoped
  }

  scope :busca_avancada, lambda { |filtro|
    scoped = all
    return scoped if filtro.blank?
    sql = []
    args = []

    if filtro[:data_inicio].presence && filtro[:data_fim]
    end

    args << filtro[:data_inicio]
    args << filtro[:data_fim]

    if filtro[:data_inicio]
      sql << ("created_at >= ? AND created_at <= ?")
      scoped = scoped.where(sql.join(' AND '), *args)
      scoped = scoped.where("status = 'Pendente' OR status = 'Realizada'")
    end

    # keys = %(users.nome users.email)
    # keys.each{ |key|
    #   val = filtro[key].presence
    #   scoped = scoped.joins(:user_entrou)
    #   scoped = scoped.where("#{key} like ?", "%#{val}%") if val
    # }

    if filtro[:status].present?
      scoped = scoped.com_status(filtro[:status])
    end

    # raise scoped.to_sql
    scoped
  }

  scope :com_status, lambda { |*list|
    scoped = all
    sql = []

    list = list.flatten.compact
    list.each{ |item|

      case item.to_sym
      when :pendente
        sql << "status = 'Pendente'"
      when :realizada
        sql << "status = 'Realizada'"
      when :desativada
        sql << "status = 'Desativada'"
      end
    }

    scoped = scoped.where(sql.join(' OR '))
    scoped
  }

  def slim_obj
    attrs = {}
    attrs[:id]             = id
    attrs[:status]         = status
    attrs[:user_saiu_id]   = user_saiu_id
    attrs[:user_entrou_id] = user_entrou_id
    attrs[:user_saiu]      = user_saiu&.to_frontend_obj
    attrs[:user_entrou]    = user_entrou&.to_frontend_obj
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

  private

  def set_status
    if self.user_entrou_id.blank?
      self.status = 'Pendente'
    elsif self.user_entrou_id.present?
      self.status = 'Realizada'
    end

    if micro_update_opts.present?
      if micro_update_opts[:desativar]
        self.status = "Desativada" if errors.empty?
      elsif micro_update_opts[:reativar]
        if self.user_entrou_id
          self.status = "Realizada" if errors.empty?
        else
          self.status = "Pendente" if errors.empty?
        end
      end
    end
  end

  def validar_existencia_usuarios
    return if micro_update_opts.present?
    if self.user_entrou_id && self.user_saiu_id
      validar_senhas
    end
  end

  def validar_senhas
    unless validar_user_opts.present?
      errors.add(:base, "É necessário preencher a senha de quem sai e quem entra para realiazar a passagem de serviço!")
    else
      unless user_saiu.verificar_senha(validar_user_opts[:user_saiu_senha])
        errors.add(:base, 'Senha errada - quem sai.')
      end
      unless user_entrou.verificar_senha(validar_user_opts[:user_entrou_senha])
        errors.add(:base, 'Senha errada - quem entra.')
      end
    end

    errors.empty?
  end

  def validar_campos
    return if micro_update_opts.present?
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
    { key: :criado_em,  label: 'Criado em' },
    { key: :passado_em, label: 'Passado em' }
  ]

  LISTA_STATUS = [
    { key: :pendente,   label: 'Pendente' },
    { key: :realizada,  label: 'Realizada' },
    { key: :desativada, label: 'Desativada' }
  ]

end
