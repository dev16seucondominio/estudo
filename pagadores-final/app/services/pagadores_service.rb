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

    pagador = Pagador.where(id: params[:id]).first

    puts "#{params}"

    if pagador.blank?
      pagador = Pagador.new(params)
      if pagador.save
        [:success, notice: "Pagador cadastrado com sucesso"]
      else
        [:error, pagador]
      end
    else
      if pagador.save
        [:success, notice: "Pagador atualizado com sucesso"]
      else
        [:error, pagador]
      end
    end
  end

  def self.destroy(params)
    pagador = Pagador.where(id: params[:id]).first
    if pagador.blank?
      [:error, pagador]
    else
      if pagador.destroy
        [:success, notice: "Pagador excluído com sucesso"]
      else
        [:error, pagador]
      end
    end
  end

end
