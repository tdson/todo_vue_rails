class Api::TasksController < ApplicationController
  def index
    @tasks = Task.order updated_at: :desc
  end

  def create
    @task = Task.new task_params
    if @task.save
      render :show, status: :created
    else
      render json: @task.errors, status: :unprocessable_entity
    end
  end

  def update
    @task = Task.find_by id: params[:id]
    if @task.update task_params
      render :show, status: :ok
    else
      render json: @task.errors, status: :unprocessable_entity
    end
  end

  private
  def task_params
    params.require(:task).permit :name, :is_done
  end
end
