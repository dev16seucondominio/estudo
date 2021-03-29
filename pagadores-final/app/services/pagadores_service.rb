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

  def self.update(params)
    pagador = Pagador.find(params[:id])

    pagador.assign_attributes(params)

    pagador.save

    resp = {pagador: pagador}

    [:success, resp]
  end

end
