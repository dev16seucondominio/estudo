class WelcomeController < ApplicationController
  def index
    cookies[:curso] = "Sistema de Informação [COOKIES]"
    session[:curso] = "Sistema de Informação [SESSION]"
    @nome = params[:nome]
    @curso = params[:curso]
  end
end
