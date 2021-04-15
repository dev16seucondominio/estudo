class PagadoresService

  def self.index(params)
    pagadores = ::Pagador.buscar(params).map(&:slim_obj)

    resp = { list: pagadores }

    resp.merge!(load_module(params)) if params[:with_settings]

    [:success, resp]

  end

  def self.show(params)
    pagador = Pagador.where(id: params[:id]).first

    return [:not_found, "Registro não encontrado."] if pagador.blank?

    resp = {pagador: pagador.to_frontend_obj}
    [:success, resp]

  end


  def self.destroy(params)
    pagador = Pagador.where(id: params[:id]).first

    # pagador[:contas].each { |i|
    #   if pagador[:contas][i]
    #     raise pagador
    #   end
    # }

    if pagador.blank?
      errors = "Registro já excluído."
      return [:not_found, errors]
    end

    if pagador.destroy
      resp = { msg: "Registro excluído com sucesso." }
      [:success, resp]
    else
      errors = pagador.errors.full_messages
      [:error, errors]
    end

  end

  def self.save(params)

    params = params[:pagador]

    if params[:id].present?
      pagador = Pagador.where(id: params[:id]).first
      if pagador.blank?
        errors = "Registro já excluído."
        return [:not_found, errors]
      end
    else
      pagador = Pagador.new
    end

    params = set_params(params)
    pagador.assign_attributes(params)

    novo = true

    if !pagador.new_record?
      novo = false
    end

    unless pagador.save
      errors = pagador.errors.full_messages
      [:error, errors]
    else
      resp = {novo: novo, pagador: pagador.to_frontend_obj}
      [:success, resp]
    end
  end

  # settings

  def self.load_module(params)
    resp = {}

    resp[:settings] = {
      pagadores: load_settings(params),
    }

    # resp[:locales] = load_locales(params)

    resp
  end

  def self.load_settings(params)
    resp = {}

    resp[:lista_operacoes] = PerfilPagamento::LISTA_OPERACOES
    resp[:lista_plano_de_contas] = PerfilPagamento::LISTA_PLANO_DE_CONTAS
    resp[:lista_fundo] = PerfilPagamento::LISTA_FUNDO
    resp[:lista_periodos] = Pagador::LISTA_PERIODOS
    resp[:tipos_conta] = Conta::TIPOS_CONTA
    resp[:lista_correcao] = ReajusteContratual::LISTA_CORRECAO
    resp[:bancos] = Banco.all.map()

    resp
  end

  private

  def self.set_params(params)
    # enderecos
    params = set_enderecos(params)

    # perfil para pagamento
    params = set_perfil_pagamentos(params)

    # contas
    params = set_contas(params)

    # reajuste contratual
    params = set_reajuste_contratual(params)

    # bloquear clientes
    params = set_bloquear_clientes(params)

    params
  end
  private_class_method :set_params

  def self.set_enderecos(params)
    enderecos = params.delete(:enderecos)
    return params if enderecos.blank?

    params[:enderecos_attributes] = enderecos
    params
  end
  private_class_method :set_enderecos

  def self.set_perfil_pagamentos(params)
    perfil_pagamentos = params.delete(:perfil_pagamentos)
    return params if perfil_pagamentos.blank?

    params[:perfil_pagamentos_attributes] = perfil_pagamentos
    params
  end
  private_class_method :set_perfil_pagamentos

  def self.set_contas(params)
    contas = params.delete(:contas)
    return params if contas.blank?

    params[:contas_attributes] = contas
    params
  end
  private_class_method :set_contas

  def self.set_reajuste_contratual(params)
    reajuste_contratual = params.delete(:reajuste_contratual)
    return params if reajuste_contratual.blank?

    params[:reajuste_contratual_attributes] = reajuste_contratual
    params
  end
  private_class_method :set_reajuste_contratual

  def self.set_bloquear_clientes(params)
    bloquear_clientes = params.delete(:bloquear_clientes)
    return params if bloquear_clientes.blank?

    params[:bloquear_clientes_attributes] = bloquear_clientes
    params
  end
  private_class_method :set_bloquear_clientes

end