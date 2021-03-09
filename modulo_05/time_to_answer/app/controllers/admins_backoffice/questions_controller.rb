class AdminsBackoffice::QuestionsController < AdminsBackofficeController
  before_action :set_question, only: [:edit]
  before_action :get_subjects, only: [:new, :edit]

  def index
    @questions = Question.includes(:subject).reverse_order.page(params[:page]).per(25)
  end

  def new
    @question = Question.new()
  end

  def edit
  end

  def create
    st, resp = AdminsBackoffice::QuestionsService.create(params_question)
    case st
    when :success then redirect_to admins_backoffice_questions_path, resp
    else
      @question = resp
      render :new
    end
  end

  def destroy
    st, resp = AdminsBackoffice::QuestionsService.destroy(params)
    case st
    when :success then redirect_to admins_backoffice_questions_path, resp
    else
      @question = resp
      redirect_to admins_backoffice_questions_path
    end
  end

  def update
    st, resp = AdminsBackoffice::QuestionsService.update(params_question)
    case st
    when :success then redirect_to admins_backoffice_questions_path, resp
    else
      @question = resp
      render :edit
    end
  end

  private

  def set_question
    @question = Question.find(params[:id])
  end

  def params_question
    params.require(:question).permit(:id, :description, :subject_id,
      answers_attributes: [:id, :description, :correct, :_destroy])
  end

  def get_subjects
    @subjects = Subject.all
  end

end
