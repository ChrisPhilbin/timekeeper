require 'pry'

class Api::V1::TasksController < ApplicationController

    before_action :set_task, only: [:show, :edit, :update, :destroy]

    def index
        @tasks = Project.find(params[:project_id]).tasks
        render json: @tasks
    end

    def show
        if authorized?
            render json: @task
        end
    end

    def create
        @task = Project.find(params[:project_id]).tasks.build(task_params)
        if authorized?
            respond_to do |format|
              if @task.save
                 format.json { render json: @task, status: 201 }
              else
                format.json { render json: @task.errors, status: :unprocessable_entity }
              end
            end
          else
            handle_unauthorized
          end
    end

    def update
      if authorized?
        if @task.update(task_params)
            render json: @task, status: 200
        else
            render json: @task.errors, status: :unprocessable_entity
        end
      else
        handle_unauthorized
      end
    end

    def destroy
      if authorized?
          @task.destroy
          respond_to do |format|
            format.json { head :no_content }
          end
      else
          handle_unauthorized
      end
    end

    private

    def task_params
        params.require(:task).permit(:name, :description, :finished, :check_out, :check_in, :total_time, :is_checked_out)
    end

    def authorized?
        current_user == @task.project.user
    end

    def set_task
        @task = Task.find(params[:id])
    end

    def handle_unauthorized
        unless authorized?
          respond_to do |format|
            format.json { render :unauthorized, status: 401 }
          end
        end
    end

end