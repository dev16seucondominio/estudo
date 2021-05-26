class Administrativo::PassagemServico < ApplicationRecord
  attr_accessor :user_saiu_senha, :user_entrou_senha

  # CONSTANTES

  LISTA_TIPO_DATA = [
    { key: :created_at,  label: 'Criado em', selected: "selected" },
    { key: :updated_at, label: 'Passado em' }
  ]

  OBJ_DEFAULT = {
    q: "", data_inicio: Time.zone.now - 1.month, data_fim: Time.zone.now, status: []
  }

  LISTA_STATUS = [
    { key: :pendente,   label: 'Pendente' ,  active: true,  id: 1, color: 'yellow'},
    { key: :realizada,  label: 'Realizada',  active: true,  id: 2, color: 'green'},
    { key: :desativada, label: 'Desativada', active: false, id: 3, color: 'red'}
  ]

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

    scoped = scoped.where(com_status_sql(:realizada, :pendente))

    if filtro[:q].present?
      scoped = busca_simples(filtro)
    elsif filtro[:avancado].present?
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

    keys = ['nome', 'email']
    keys.each{ |key|
      sql  << "(users.#{key} like ?)"
      args << "%#{q}%"

      sql  << "(user_entrous_administrativo_passagem_servicos.#{key} like ?)"
      args << "%#{q}%"
    }
    scoped = scoped.left_outer_joins(:user_saiu, :user_entrou)
    scoped = scoped.where(sql.join(' OR '), *args)

    if filtro[:status].present?
      scoped = scoped.where(com_status_sql(filtro[:status]))
    end

    scoped
  }

  scope :busca_avancada, lambda { |filtro|
    scoped = all
    return scoped if filtro.blank?
    periodo = []
    sql = []
    args = []

    periodo << filtro[:data_inicio].to_date.beginning_of_day if filtro[:data_inicio].present?
    periodo << filtro[:data_fim].to_date.end_of_day if filtro[:data_fim].present?

    # A única maneira que consegui fazer buscar por um dia específico foi fazendo
    # essas conversões to_date e depois beginning e end of day.
    if periodo.present?
      if filtro[:data_fim].present?
      scoped = scoped.where("(#{table_name}.#{filtro[:tipo_data] || 'created_at'} >= ?
        AND #{table_name}.#{filtro[:tipo_data] || 'created_at'} <= ?)", *periodo)
      else
        scoped = scoped.where("(#{table_name}.#{filtro[:tipo_data] || 'created_at'} >= ?)", *periodo)
      end
    end

    keys = ['id', 'email']
    keys.each{ |key|
      val = filtro[key.to_sym].presence
      if val
        sql  << "(users.#{key} = ?)"
        args << "#{filtro[key.to_sym]}"

        sql  << "(user_entrous_administrativo_passagem_servicos.#{key} = ?)"
        args << "#{filtro[key.to_sym]}"
      end
    }
    scoped = scoped.left_outer_joins(:user_saiu, :user_entrou)
    scoped = scoped.where(sql.join(' OR '), *args)

    if filtro[:status].present?
      scoped = scoped.where(com_status_sql(filtro[:status]))
    end

    scoped
  }

  LISTA_STATUS.each do |status|
    # cria metodos
      # passagem.realizada?
      # passagem.desativada?
      # passagem.pendente?
    define_method "#{status[:key]}?" do
      # estou dentro da instancia (objeto) - não estou dentro da classe
      status[:id] == status_id
    end
  end

  def slim_obj
    attrs = {}
    attrs[:id]             = id
    attrs[:status]         = status_obj
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

  def get_status_obj
    @get_status_obj = nil if status_id_changed?
    @get_status_obj ||= self.class.get_status_obj_by :id, status_id
  end

  def status_obj # ou status
    resp = {}
    obj = get_status_obj
    resp[:color] = obj[:color]
    resp[:label] = obj[:label]
    resp[:key] = obj[:key]
    # resp[:help] = 'desativado em sss/mm/yyy'
    LISTA_STATUS.each do |status|
      resp[status[:key]] = send("#{status[:key]}?")
    end

    resp
  end

  def get_status_id key
    self.class.get_status_id key
  end

  def status_key
    get_status_obj[:key]
  end

  def self.get_status_id key
    # Administrativo::PassagemServico.get_status_id :pendente
    self.get_status_obj_by(:key, key.to_sym)[:id]
  end

  def self.get_status_obj_by key, value
    LISTA_STATUS.find { |it| it[key] == value } || {}
  end

  def self.com_status_sql *keys
    # Administrativo::PassagemServico.com_status_sql(:pendente, :realizada)
    sql = []
    keys = keys.flatten.compact
    ids = keys.map { |key| get_status_id(key)  }
    return if ids.empty?

    "status_id IN (#{ids.join(',')})"
  end

  private

  def set_status
    return self.status_id = get_status_id(:desativada) if cancelada_em.present?
    return self.status_id = get_status_id(:realizada) if user_entrou_id.present? && user_saiu_id.present?
    return self.status_id = get_status_id(:pendente)  # if user_entrou_id.blank? # || user_saiu_id.blank?
  end

  def users_presentes?
    user_entrou_id.present? && user_saiu_id.present?
  end

  def validar_ja_realizada
    return if user_entrou_id_was.nil?

    modificando_users = user_entrou_id_changed? || user_saiu_id_changed?
    if users_presentes? && modificando_users
      errors.add(:base, "Passagem já realizada")
    end
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
    return unless users_presentes?
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

end
