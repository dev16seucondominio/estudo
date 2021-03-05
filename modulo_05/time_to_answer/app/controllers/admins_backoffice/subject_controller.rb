class AdminsBackoffice::SubjectsController < AdminsBackofficeController
  before_action :set_subject, only: [:edit, :update, :destroy]

  def index
    @subjects = Subject.all.page(params[:page]).per(5)
  end

  def new
    @subject = Subject.new()
  end

  def create
    st, resp = AdminsBackoffice::AdminsService.create(params_admin)
    case st
    when :success then redirect_to admins_backoffice_admins_path, resp
    else
      @subject = resp
      render :new
    end
  end

  def destroy
    if @subject.destroy
      redirect_to admins_backoffice_admins_path, notice: "Administrador excluído com sucesso"
    else
      render :index
    end
  end

  def edit
  end

  def update
    if @subject.update(params_admin)
      redirect_to admins_backoffice_admins_path, notice: "Administrador atualizado com sucesso"
    else
      render :edit
    end
  end

  private

  def set_subject
    @subject = Subject.find(params[:id])
  end

  def params_admin
    params.require(:admin).permit(:email, :password, :password_confirmation)
  end

  def verify_password
    if params[:admin][:password].blank? && params[:admin][:password_confirmation].blank?
      params[:admin].extract!(:password, :password_confirmation)
    end
  end

end
