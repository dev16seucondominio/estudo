class ApplicationController < ActionController::Base

	before_action :load_paths

	def get_params
		params_to_hash(params.to_unsafe_h)
	end

	private

	def layout_erp
		render html: "", layout: "layouts/application" # aquilo q eu expliquei do index do projeto ser o application.html... eh o arquivo carregado por padrao, o index da modulo especifico eh incluido a partir de outro lugar
	end

	def load_paths
		Dir["#{Rails.root}/app/services/*"].each{ |file| require file }
	end

  def params_to_hash(val)
    # angular envia params por GET em string invés de HASH
    # aqui convertemos se necessário e fazemos recursive_symbolize
    json_parse = lambda { |item|
      item = item.to_boolean if item.in? ['true', 'false'] # transforma strings em boleanos de verdade
      return item unless item.is_a?(::String) && (item.is_hash? || item.is_array?)
      params_to_hash(JSON.parse(item))
    }
    resp = val
    if resp.is_a?(::String)# && (resp.is_hash? || resp.is_array?)
      resp = json_parse.call(resp)
    elsif resp.is_a?(Hash)
      list = resp.keys
      list.each{ |k| resp[k] = json_parse.call(resp[k]) }
    elsif resp.is_a?(Array)
      resp.map!{ |item| params_to_hash(item) }
    end
    should_symbolize = resp.is_a?(Hash) || resp.is_a?(ActionController::Parameters)
    should_symbolize ? resp.deep_symbolize_keys : resp
  end

end
