class Administrativo::CategoriasController < ApplicationController
	skip_before_action :verify_authenticity_token

	def save
		status, resp = Administrativo::CategoriasService.save(params_categoria)

		case status
		when :success then render json: resp, status: :ok
		when :not_found then render json: { errors: resp }, status: :not_found
		end
	end

	def destroy
		status, resp = Administrativo::CategoriasService.destroy(params)

		case status
		when :success then render json: resp, status: :ok
    when :error then render json: { errors: resp }, status: :error
		end
	end

	def params_categoria
		attrs = [:categoria, :id, :nome]

		resp = {}
		resp[:categoria] = params.require(:categoria).permit(attrs)
		resp
	end
end
