class PagadoresController < ApplicationController
  def index
    respond_to do |format|
      format.html { layout_erp }
      format.json{
        status, response = service.index(opts={}, get_params)

        case status
        when :success then render json: response, status: :ok
        when :error then render json: { errors: response }, status: :error
        end
      }
    end
  end
end
