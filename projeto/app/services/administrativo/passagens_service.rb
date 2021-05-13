class Administrativo::PassagensService

  def self.index(params)
    passagens = Administrativo::PassagemServico.all.reverse_order.map(&:to_frontend_obj)

    resp = { list: passagens }

    resp.merge!(load_module(params)) if params[:with_settings]

    [:success, resp]
  end

  def self.micro_update

    raise params

    if params[:micro_update_type].blank?
      errors.add(:base, 'Registro não encontrado.')
      return [:not_found, errors]
    end

    case params[:micro_update_type]
    when :passar_servico 
      passar_servico(params)
    end

  end

  def self.passar_servico
    
    if params[:id].present?
      passagem = Administrativo::PassagemServico.where(id: params[:id]).first
    elsif passagem.blank?
      errors = "Registro não existe"
      return [:not_found, errors]
    end

    if passagem.micro_update
      resp = {passagem: passagem.to_frontend_obj}
      [:success, resp]
    else
      resp = passagem.errors.full_messages
      [:error, errors]
    end

  end

  def self.save(params)
    params = params[:passagem]

    if params[:id].present?
      passagem = Administrativo::PassagemServico.where(id: params[:id]).first
      if passagem.blank?
        errors = "Registro não existe"
        return [:not_found, errors]
      end
    else
      passagem = Administrativo::PassagemServico.new
    end

    params = set_params(params)
    passagem.assign_attributes(params)

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

    resp
  end

  def self.set_params(params)
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
