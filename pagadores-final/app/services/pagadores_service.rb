class PagadoresService

  def self.index(params)
    pagadores = Pagador.all.map(&:slim_obj)
    # pra cada pessoa da lista... pessoa = pessoa.slim_obj
    # o .map eh tipo um foreach, each, for... ele faz o map da hash ou array e envia o comando passado no argumento
    # pagadores = pagadores.map(&:slim_obj)

    resp = {list: pagadores}

    [:success, resp]

  end

  def self.show(params)
    pagador = Pagador.find(params[:id])

    resp = {pagador: pagador.to_frontend_obj}

    [:success, resp]
  end


  def self.save(params)
    puts "---------------------------------------------------------AAAAAAAAAA#{params}"



    pagador = Pagador.where(id: params[:id]).first || Pagador.new()

    params = set_params(params)
    puts "---------------------------------------------------------#{params}"
    pagador.assign_attributes(params)

    unless pagador.save
      resp = { msg: "Registro não encontrado." }
      [:error, resp]
    else
      resp = { pagador: pagador.to_frontend_obj }
      [:success, resp]
    end
    
  end

  def self.destroy(params)
    pagador = Pagador.where(id: params[:id]).first 
    return [:not_found, { msg: 'Registro não encontrado' }] if pagador.blank?

    if pagador.destroy
      resp = { msg: "Registro excluído com sucesso." }
      [:success, resp]
    else
      resp = { msg: "Registro não encontrado." }
      [:error, resp]
    end  
  end

  private

  def self.set_params(params)
    # enderecos
    params = set_enderecos(params)
    # contas
    # params = set_contas(params)

    params
  end

  def self.set_enderecos(params)
    return if params[:enderecos].blank?
    enderecos = params.delete(:enderecos)

    params[:enderecos_attributes] = enderecos
    params
  end
end
