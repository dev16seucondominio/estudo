class Administrativo::PassagemServico < ApplicationRecord
  attr_accessor :user_saiu_senha, :user_entrou_senha

  # Associations

  belongs_to :user_saiu, class_name: "User", foreign_key: :user_saiu_id
  belongs_to :user_entrou, class_name: "User", foreign_key: :user_entrou_id, optional: true

  has_many :objetos, class_name: "Administrativo::PassagemServicoObjeto",
    foreign_key: :passagem_servico_id

  accepts_nested_attributes_for :objetos, allow_destroy: true

  # Validates
  before_validation :set_status
  validate :validar_campos
  validate :validar_existencia_usuarios
  validate :validar_ja_realizada

  scope :buscar, lambda { |params|
    filtro = params[:filtro] || {}
    scoped = all

    # raise filtro.to_json

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

  def users_presentes?
    user_entrou_id.present? && user_saiu_id.present?
  end

  def validar_ja_realizada
    modificando_users = user_entrou_id_changed? || user_saiu_id_changed?
    if users_presentes? && modificando_users
      errors.add(:base, "Passagem já realizada")
    end
  end

  def set_status
    return self.status = "Desativada" if cancelada_em.present?
    return self.status = 'Realizada' if user_entrou_id.present? && user_saiu_id.present?
    return self.status = 'Pendente'  # if user_entrou_id.blank? # || user_saiu_id.blank?
  end

  def validar_existencia_usuarios
    validar_senhas if users_presentes?
  end

  def realizando_passagem?
    preenchendo_users = user_entrou_id_was.blank? && user_saiu_id_was.blank?
    users_presentes? && preenchendo_users
  end

  def faltando_senha?
    user_saiu_senha.blank? || user_entrou_senha.blank?
    # validar_user_opts.blank?
  end


  def validar_senhas
    return unless realizando_passagem?
    if faltando_senha?
      return errors.add(:base, "É necessário preencher a senha de quem sai e quem entra para realiazar a passagem de serviço!")
    end
    errors.add(:base, 'Senha errada - quem sai.') unless user_saiu.verificar_senha(user_saiu_senha)
    errors.add(:base, 'Senha errada - quem entra.') unless user_entrou.verificar_senha(user_entrou_senha)
    errors.empty?
  end

  def validar_campos
    errors.add(:base, 'Quem sai não pode ser vazio.') if user_saiu_id.blank?

    if objetos.present?
      objetos.each do |objeto|
        if objeto[:objeto_categoria_id].blank?
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

  OBJ_DEFAULT = {
    q: "", user_entrou: "", user_saiu: "", data_inicio: Time.zone.now - 1.month,
    data_fim: Time.zone.now, status: []
  }

  LISTA_STATUS = [
    { key: :pendente,   label: 'Pendente' ,  active: true },
    { key: :realizada,  label: 'Realizada',  active: true },
    { key: :desativada, label: 'Desativada', active: false}
  ]

end
