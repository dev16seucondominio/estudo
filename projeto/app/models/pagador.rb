class Pagador < ApplicationRecord

  # ASSOCIATIONS

  has_many :enderecos, class_name: "Endereco", foreign_key: :pagador_id, dependent: :destroy, inverse_of: :pagador
  accepts_nested_attributes_for :enderecos, allow_destroy: true

  has_many :contas, class_name: "Conta", foreign_key: :pagador_id, dependent: :destroy, inverse_of: :pagador
  accepts_nested_attributes_for :contas, allow_destroy: true

  has_one :perfil_pagamentos, class_name: "PerfilPagamento", foreign_key: :pagador_id, dependent: :destroy, inverse_of: :pagador
  accepts_nested_attributes_for :perfil_pagamentos, allow_destroy: true

  has_one :reajuste_contratual, class_name: "ReajusteContratual", foreign_key: :pagador_id, dependent: :destroy, inverse_of: :pagador
  accepts_nested_attributes_for :reajuste_contratual, allow_destroy: true

  has_one :bloquear_clientes, class_name: "BloquearCliente", foreign_key: :pagador_id, dependent: :destroy, inverse_of: :pagador
  accepts_nested_attributes_for :bloquear_clientes, allow_destroy: true

  # VALIDAÇÕES

  before_validation :garantir_email

  validate :validar_campos

  # CONSTANTES

  LISTA_PERIODOS = [
    {id: 0, key: "dias", nome: "Dias", default: false},
    {id: 1, key: "meses", nome: "Meses", selected: true},
    {id: 2, key: "Anos", nome: "Anos", default: true}
  ]

  LISTA_OPCOES = [
    { key: :com_endereco,        label: 'Com endereço' },
    { key: :sem_endereco,        label: 'Sem endereço' },
    { key: :endereco_completo,   label: 'Endereço completo' },
    { key: :endereco_incompleto, label: 'Endereço Incompleto' },
    { key: :com_documento,       label: 'Com CPF/CNPJ' },
    { key: :sem_documento,       label: 'Sem CPF/CNPJ' },
    { key: :com_bloqueio,        label: 'Com bloqueio inadimplente' },
    { key: :sem_bloqueio,        label: 'Sem bloqueio inadimplente' },
    { key: :com_email,           label: 'Com emails' },
    { key: :sem_email,           label: 'Sem emails' },
    { key: :com_contas,          label: 'Com contas' },
    { key: :sem_contas,          label: 'Sem contas' }
  ]

  Q_HELP = {
    opcoes: {
      com_endereco: "enderecos.id IS NOT NULL",
      sem_endereco: "enderecos.id IS NULL",
      endereco_completo: "enderecos.cep IS NOT NULL AND
                          enderecos.cidade IS NOT NULL AND
                          enderecos.bairro IS NOT NULL AND
                          enderecos.logradouro IS NOT NULL AND
                          enderecos.complemento IS NOT NULL".squish,
      endereco_incompleto: "enderecos.cep IS NULL OR
                            enderecos.cidade IS NULL OR
                            enderecos.bairro IS NULL OR
                            enderecos.logradouro IS NULL OR
                            enderecos.complemento IS NULL".squish,
      com_documento: "#{table_name}.doc IS NOT NULL",
      sem_documento: "#{table_name}.doc IS NULL",
      com_bloqueio: "bloquear_clientes.id IS NOT NULL",
      sem_bloqueio: "bloquear_clientes.id IS NULL",
      com_email: "#{table_name}.email IS NOT NULL",
      sem_email: "#{table_name}.email IS NULL",
      com_contas: "contas.id IS NOT NULL",
      sem_contas: "contas.id IS NULL",
    }
  }

    # if "#{q}".is_email?
    #   return scoped.where(email: email)
    # end

    # if "#{q}".any_number?
    #   sql  << "(nasc = ?)"
    #   args << "#{q}"
    # end

  scope :buscar, lambda { |params|
    filtro = params[:filtro] || {}
    scoped = all

    if filtro[:q].present?
      scoped = busca_simples(filtro)
    elsif filtro[:avancado].present?
      scoped = busca_avancada(filtro)
    end

    scoped.distinct
  }

  scope :busca_simples, lambda { |filtro|
    scoped = all

    q = filtro[:q]
    return scoped if q.blank?

    sql  = []
    args = []

    sql  << "(email like ? OR emailalt like ?)"
    args += ["%#{q}%", "%#{q}%"]

    sql  << "(nome like ?)"
    args << "%#{q}%"

    sql  << "(razao_social like ?)"
    args << "%#{q}%"

    sql  << "(doc like ?)"
    args << "%#{q}%"

    sql  << "(telefone like ?)"
    args << "%#{q}%"

    scoped = scoped.where(sql.join(' OR '), *args)

    scoped
  }

  scope :busca_avancada, lambda { |filtro|
    scoped = all
    return scoped if filtro.blank?

    keys = %i(nome doc telefone email)
    keys.each{ |key|
      val = filtro[key].presence
      scoped = scoped.where("#{key} like ?", "%#{val}%") if val
    }

    if filtro[:opcoes].present?
      scoped = scoped.com_opcoes(filtro[:opcoes])
    end

    scoped
  }

  scope :com_opcoes, lambda { |*list|
    q_help = Q_HELP[:opcoes]

    scoped = all

    list = list.flatten.compact
    list.each{ |item|
      key = item.to_sym

      case key
      when :sem_endereco
        scoped = scoped.left_outer_joins(:enderecos)
      when :com_endereco
        scoped = scoped.joins(:enderecos)
      when :sem_contas
        scoped = scoped.left_outer_joins(:contas)
      when :com_contas
        scoped = scoped.joins(:contas)
      when :endereco_incompleto
        scoped = scoped.left_outer_joins(:enderecos)
      when :endereco_completo
        scoped = scoped.joins(:enderecos)
      end

      sql = q_help[key.to_sym]
      scoped = scoped.where(sql)
    }

    scoped
  }

  def slim_obj
    attrs = {}
    attrs[:id] = id
    attrs[:nome] = nome
    attrs[:tipo] = tipo
    attrs[:juridica] = juridica
    attrs
  end

  def to_frontend_obj
    attrs = slim_obj
    attrs[:sexo] = sexo
    attrs[:deficiente] = deficiente
    attrs[:doc] = doc
    attrs[:rg] = rg
    attrs[:nasc] = nasc
    attrs[:prof] = prof
    attrs[:email] = email
    attrs[:emailalt] = emailalt
    attrs[:iden] = iden
    attrs[:telefone] = telefone
    attrs[:razao_social] = razao_social
    attrs[:contato] = contato
    attrs[:enderecos] = enderecos
    attrs[:perfil_pagamentos] = perfil_pagamentos
    attrs[:contas] = contas
    attrs[:reajuste_contratual] = reajuste_contratual
    attrs[:bloquear_clientes] = bloquear_clientes
    attrs[:obs] = obs
    attrs
  end

  private

  def validar_campos
    errors.add(:base, 'Nome não pode ser vazio') if self.nome.blank?

    # Fake verificação se CPF/CNPJ está correto
    if self.doc.present?
      if self.juridica
        errors.add(:base, 'CNPJ inválido') if !self.doc.is_cnpj?
      else
        errors.add(:base, 'CPF inválido') if !self.doc.is_cpf?
      end
    end

    if self.email.present? && !self.email.is_email?
      errors.add(:base, 'E-mail não é válido')
    end

    errors.empty?
  end

  def garantir_email
    return if self.email.blank?
    self.email = email.downcase
  end

end
