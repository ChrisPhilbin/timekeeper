class Api::V1::ProjectsController < ApplicationController
    before_action :authenticate_user!
    before_action :set_project, only: [:show, :edit, :update, :destroy]

    def index
        @projects = current_user.projects
        render json: @projects
    end

    def show
        if authorized?
            render json: {project: @project, total_time: @project.tasks.sum(:total_time) }
        else
            handle_unauthorized
        end
    end

    def create
        @project = current_user.projects.build(project_params)
        if authorized?
          respond_to do |format|
            if @project.save
               format.json { render json: @project, status: 201 }
            else
              format.json { render json: @project.errors, status: :unprocessable_entity }
            end
          end
        else
          handle_unauthorized
        end
    end

    def update
        if authorized?
            respond_to do |format|
              if @project.update(project_params)
                format.json { render json: @project, status: 200 }
              else
                format.json { render json: @project.errors, status: :unprocessable_entity }
              end
            end
        else
            handle_unauthorized
        end
    end
    
    def destroy
        if authorized?
            @project.destroy
            render json: @project
        else
            handle_unauthorized
        end
    end

    private

    def project_params
        params.require(:project).permit(:name, :description, :finished)
    end

    def set_project
        @project = Project.find(params[:id])
    end

    def authorized?
        @project.user == current_user
    end

    def handle_unauthorized
        unless authorized?
          respond_to do |format|
            format.json { render :unauthorized, status: 401 }
          end
        end
    end
end
