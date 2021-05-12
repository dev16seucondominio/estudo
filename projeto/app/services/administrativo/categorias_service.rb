class Administrativo::CategoriasService

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

    categoria.assign_attributes(params)

    if categoria.save
      resp = {categoria: categoria.to_frontend_obj}
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

end
