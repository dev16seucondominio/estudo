class Administrativo::CategoriasService

  def self.index(params)
    categorias = Administrativo::PassagemServicoObjetoCategoria.all.map(&:slim_obj)

    resp = { list: categorias }

    resp.merge!(load_module(params)) if params[:with_settings]

    [:success, resp]
  end

  def self.save(params)
    params = params[:categoria]

    if params[:id].present?
      categoria = Administrativo::PassagemServicoObjetoCategoria.where(id: params[:id]).first
      if categoria.blank?
        errors = "Registro não existe"
        return [:not_found, errors]
      end
    else
      categoria = Administrativo::PassagemServicoObjetoCategoria.new
    end

    params = set_params(params)
    categoria.assign_attributes(params)

    if categoria.save
      resp = {categoria: categoria.slim_obj}
      [:success, resp]
    else
      errors = categoria.errors.full_messages
      [:error, errors]
    end
  end

  def self.destroy(params)
  	categoria = Administrativo::PassagemServicoObjetoCategoria.where(id: params[:id]).first

  	if categoria.destroy
  		resp = {msg: "Registro excluído com sucesso"}
  		[:success, resp]
  	else
  		errors = categoria.errors.full_messages
  		[:error, errors]
  	end
  end

  def self.load_module(params)
    resp = {}

    resp[:settings] = {
      categorias: load_settings(params)
    }

    resp
  end

  def self.load_settings(params)
    resp = {}
    resp[:lista_categorias] = Administrativo::PassagemServicoObjetoCategoria.all
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
