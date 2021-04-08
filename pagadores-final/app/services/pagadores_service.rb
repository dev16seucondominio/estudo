class PagadoresService

  def self.index(params)
    pagadores = Pagador.all.map(&:slim_obj)

    resp = {list: pagadores}

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

    pagador = Pagador.where(id: params[:id]).first || Pagador.new()
    params = set_params(params)

    pagador.assign_attributes(params)

    msg = "Registro criado com sucesso."

    if !pagador.new_record?
      msg = "Registro alterado com sucesso."
    end

    unless pagador.save
      errors = pagador.errors.full_messages
      [:error, errors]
    else
      resp = { msg: msg, pagador: pagador.to_frontend_obj}
      [:success, resp]
    end

  end

  private

  def self.set_params(params)
    # enderecos
    params = set_enderecos(params)
    # contas
    params = set_contas(params)
    params
  end

  def self.set_enderecos(params)
    enderecos = params.delete(:enderecos)
    return params if enderecos.blank?

    params[:enderecos_attributes] = enderecos
    params
  end

  def self.set_contas(params)
    contas = params.delete(:contas)
    return params if contas.blank?

    params[:contas_attributes] = contas
    params
  end

end
