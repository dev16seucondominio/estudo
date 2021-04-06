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

    pagador = Pagador.where(id: params[:id]).first || Pagador.new()

    pagador.assign_attributes(params)

    if pagador.save
      resp = { pagador: pagador.to_frontend_obj }
      [:success, resp]
    else
      resp = { msg: "Registro não encontrado." }
      [:error, resp]
    end
    
  end

  def self.destroy(params)
    pagador = Pagador.where(id: params[:id]).first 

    if pagador.destroy
      resp = { msg: "Registro excluído com sucesso." }
      [:success, resp]
    elsif pagador.nil?
      resp = { msg: "Registro já foi excluído." }
      [:not_found, resp]
    else
      resp = { msg: "Registro não encontrado." }
    end
    
  end

end
