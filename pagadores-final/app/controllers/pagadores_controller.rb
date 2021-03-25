class PagadoresController < ApplicationController
  # list = get = index, por padrao a gente usa index no controller, na resource/route blz nao sei se eh exatamente qualquer um, mas so manter nesse padrao q nao da erro sdpofpasdokfpofkapfkasdasdasdpoaksd
  # como eu disse antes, o index eh o metodo chamado assim q a tela eh aberta/carregada... eh a primeira requisicao
  def index # index = list
    respond_to do |format|
      ## dentro dos formatos disponiveis (existem outros, bem como formatos de arquivos - pra carregar um pdf, por exemplo), tu precisa setar o que o metodo vai retornar de acordo com o formato passdao... se for html, eh carregar uma template, se for json, eh carregar um registro ou fazer uma requisicao q carrega varios registros...
      format.html { layout_erp } # qnd bate no html ele carrega a template
      format.json{

        status, resp = PagadoresService.index(get_params)

        case status
        when :success then render json: resp, status: :ok
        when :error then render json: { errors: resp }, status: :error
        end
      }
    end
  end

  def show
    puts 'asdasdasdasdasdas'
    status, resp = PagadoresService.show(get_params)
    render json: resp
  end
end
