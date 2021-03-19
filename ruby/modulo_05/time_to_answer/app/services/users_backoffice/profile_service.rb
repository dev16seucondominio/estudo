class UsersBackoffice::ProfileService


  def self.update(params)
    user = User.where(id: params[:id]).first

    user.assign_attributes(params)

    if user.save
      [:success, notice: "Usuário atualizado com sucesso"]
    else
      [:error, user]
    end
  end

end
