class PagadoresController < ApplicationController
  # set service: PagadoresService
  # list = get = index, por padrao a gente usa index no controller, na resource/route blz nao sei se eh exatamente qualquer um, mas so manter nesse padrao q nao da erro sdpofpasdokfpofkapfkasdasdasdpoaksd
  # como eu disse antes, o index eh o metodo chamado assim q a tela eh aberta/carregada... eh a primeira requisicao
  def index
    respond_to do |format|
      ## dentro dos formatos disponiveis (existem outros, bem como formatos de arquivos - pra carregar um pdf, por exemplo), tu precisa setar o que o metodo vai retornar de acordo com o formato passdao... se for html, eh carregar uma template, se for json, eh carregar um registro ou fazer uma requisicao q carrega varios registros...
      format.html { layout_erp } # qnd bate no html ele carrega a template
      format.json{
        ## quando carregamos a tela, o html manda uma requisicao "automatica" com alguns dados base, e aqui a gente manda esses dados pro service (pra carregar uma lista especifica de pagafdores, por exemplo...)
        # status, response = service.index(opts={}, get_params)
        # key_1, key_2 = posicao_1, posicao_2 da array
        # vai bater no servico... no metodo index

        status = error, success
        response = { obj: { lista_pagadores: [], settings: [], locales: [] } }...

        # dependendo so status cai numa das opcoes abaixo...



        case status
        when :success then render json: response, status: :ok # se for sucesso ele retornar :ok e e obj pro front
        when :error then render json: { errors: response }, status: :error # se for error ele retorna :error e o obj de erros (array ou obj literalmente com mensagens de erro...)
        end
      }
    end
  end
end
