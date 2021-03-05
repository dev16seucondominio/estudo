class AdminsBackoffice::AdminsService

  def self.create(params)
    admin = Admin.new(params)
    if admin.save
      [:success, notice: "Administrador cadastrado com sucesso"]
    else
      [:error, admin]
    end
  end

  def self.update(params)
    puts "Params dentro do service #{params}"
    admin = Admin.where(id: params[:id]).first || Admin.new

    admin.assign_attributes(params)


    if admin.save
      [:success, notice: "Administrador atualizado com sucesso"]
    else
      [:error, admin]
    end
  end

  def self.destroy(params)

    admin = Admin.where(id: params[:id]).first

    admin.assign_attributes(params)

    if admin.destroy
      [:success, notice: "Administrador excluído com sucesso"]
    else
      [:error, admin]
    end
  end

end
