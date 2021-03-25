class ApplicationController < ActionController::Base

	before_action :load_paths

	def get_params
		params.to_unsafe_h
	end

	private

	def layout_erp
		render html: "", layout: "layouts/application" # aquilo q eu expliquei do index do projeto ser o application.html... eh o arquivo carregado por padrao, o index da modulo especifico eh incluido a partir de outro lugar
	end

	def load_paths
		Dir["#{Rails.root}/app/services/*"].each{ |file| require file }
	end

end
