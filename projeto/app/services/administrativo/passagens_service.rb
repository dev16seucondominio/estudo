class Administrativo::PassagensService

  def self.index(params)
    passagens = Administrativo::PassagemServico.all.map(&:slim_obj)
    
    resp = { list: passagens }

    resp.merge!(load_module(params)) if params[:with_settings]

    [:success, resp]
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

    if passagem.save
      resp = {passagem: passagem.slim_obj}
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
    params = set_lista_objetos(params)
    params
  end

  def self.set_lista_objetos(params)
    lista_objetos = params.delete(:lista_objetos)
    return params if lista_objetos.blank?

    params[:lista_objetos_attributes] = lista_objetos
    params
  end


end
