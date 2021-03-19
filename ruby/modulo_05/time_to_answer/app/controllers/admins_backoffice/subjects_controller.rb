class AdminsBackoffice::SubjectsController < AdminsBackofficeController
  before_action :set_subject, only: [:edit]

  def index
    respond_to do |format|
      format.html { @subjects = Subject.all.order(:description).page(params[:page]).per(5) }
      format.pdf { @subjects = Subject.all.order(:description) }
      format.json { (@subjects = Subject.all.order(:description)) }
    end
  end

  def new
    @subject = Subject.new()
  end

  def edit
  end

  def create
    st, resp = AdminsBackoffice::SubjectsService.create(params_subject)
    case st
    when :success then redirect_to admins_backoffice_subjects_path, resp
    else
      @subject = resp
      render :new
    end
  end

  def destroy
    st, resp = AdminsBackoffice::SubjectsService.destroy(params)
    case st
    when :success then redirect_to admins_backoffice_subjects_path, resp
    else
      @subject = resp
      redirect_to admins_backoffice_subjects_path
    end
  end

  def update
    st, resp = AdminsBackoffice::SubjectsService.update(params_subject)
    case st
    when :success then redirect_to admins_backoffice_subjects_path, resp
    else
      @subject = resp
      render :edit
    end
  end

  private

  def set_subject
    @subject = Subject.find(params[:id])
  end

  def params_subject
    params.require(:subject).permit(:id, :description)
  end

end
