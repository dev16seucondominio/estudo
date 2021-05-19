class Administrativo::PassagensService

  def self.index(params)
    passagens = Administrativo::PassagemServico.buscar(params).reverse_order.map(&:slim_obj)

    resp = { list: passagens }

    resp.merge!(load_module(params)) if params[:with_settings]

    [:success, resp]
  end

  def self.micro_update(params)

    passagem = params[:passagem]

    micro_update_type = passagem[:micro_update_type]

    case micro_update_type.to_s.to_sym
    when :passar_servico then passar_servico(passagem)
    when :desativar then desativar(passagem)
    when :reativar then reativar(passagem)
    else
      fail 'Opção inválida'
    end
  end

  def self.desativar(params)
    passagem = Administrativo::PassagemServico.where(id: (params || {})[:id]).first

    if passagem.blank?
      errors = "Registro não existe"
      return [:not_found, errors]
    end

    pas_params = set_params(params)
    passagem.assign_attributes(pas_params)

    if passagem.save
      resp = {passagem: passagem.to_frontend_obj}
      [:success, resp]
    else
      resp = passagem.errors.full_messages
      return [:error, resp]
    end
  end

  def self.reativar(params)
    passagem = Administrativo::PassagemServico.where(id: (params || {})[:id]).first

    if passagem.blank?
      errors = "Registro não existe"
      return [:not_found, errors]
    end

    pas_params = set_params(params)
    passagem.assign_attributes(pas_params)

    if passagem.save
      resp = {passagem: passagem.to_frontend_obj}
      [:success, resp]
    else
      resp = passagem.errors.full_messages
      return [:error, resp]
    end
  end

  def self.passar_servico(params)
    params.delete(:micro_update_type)

    passagem = Administrativo::PassagemServico.where(id: (params || {})[:id]).first
    if passagem.blank?
      errors = "Registro não existe"
      return [:not_found, errors]
    end

    pas_params = set_params(params)
    passagem.assign_attributes(pas_params)

    if passagem.save
      resp = {passagem: passagem.to_frontend_obj}
      [:success, resp]
    else
      resp = passagem.errors.full_messages
      return [:error, resp]
    end
  end

  def self.show(params)
    passagem = Administrativo::PassagemServico.where(id: params[:id]).first

    return [:not_found, "Registro não encontrado."] if passagem.blank?

    resp = {passagem: passagem.to_frontend_obj}
    [:success, resp]
  end

  def self.save(params)
    params = params[:passagem]

    if params[:id].present?
      passagem = Administrativo::PassagemServico.where(id: params[:id]).first
      if passagem[:user_entrou_id].present?
        errors = "Passagem já realizada"
        return [:error, errors]
      elsif passagem.blank?
        errors = "Registro não existe"
        return [:not_found, errors]
      end
    else
      passagem = Administrativo::PassagemServico.new
    end

    pas_params = set_params(params)
    passagem.assign_attributes(pas_params)

    novo = passagem.new_record?

    if passagem.save
      resp = {novo: novo, passagem: passagem.to_frontend_obj}
      [:success, resp]
    else
      errors = passagem.errors.full_messages
      [:error, errors]
    end
  end

  def self.destroy(params)
  	passagem = Administrativo::PassagemServico.where(id: params[:id]).first

  	if passagem.destroy
  		resp = {msg: "Registro excluído com sucesso"}
  		[:success, resp]
  	else
  		errors = passagem.errors.full_messages
  		[:error, errors]
  	end
  end

  def self.load_module(params)
    resp = {}

    resp[:settings] = {
      passagens: load_settings(params)
    }

    resp
  end

  def self.load_settings(params)
    resp = {}

    resp[:lista_categorias] = Administrativo::PassagemServicoObjetoCategoria.all
    resp[:usuarios] = User.all.map(&:to_frontend_obj)
    resp[:lista_tipo_data] = Administrativo::PassagemServico::LISTA_TIPO_DATA
    resp[:lista_status] = Administrativo::PassagemServico::LISTA_STATUS
    resp[:filtro] = { q: "", user_entrou: "", user_saiu: "", status: []}

    resp
  end

  def self.set_params(params)
    if params[:user_saiu_senha].presence || params[:user_entrou_senha].presence
      params[:validar_user_opts] = {
        user_saiu_senha:   params.delete(:user_saiu_senha),
        user_entrou_senha: params.delete(:user_entrou_senha)
      }
    else
      params.delete(:user_saiu_senha) if params[:user_saiu_senha].blank?
      params.delete(:user_entrou_senha) if params[:user_entrou_senha].blank?
    end

    if params[:micro_update_type] == 'desativar'
      params[:micro_update_opts] = {desativar: true}
    elsif params[:micro_update_type] == 'reativar'
      params[:micro_update_opts] = {reativar: true}
    end

    params.delete(:micro_update_type)

    params = set_objetos(params)
    params
  end

  def self.set_objetos(params)
    objetos = params.delete(:objetos)
    return params if objetos.blank?

    params[:objetos_attributes] = objetos
    params
  end

end
