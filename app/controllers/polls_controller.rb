class PollsController < ApplicationController
  before_action :load_poll, only: %i[ show update destroy ]

  # GET /polls or /polls.json
  def index
    polls = Poll.all.order('created_at DESC')
    render status: :ok, json: { polls: polls }
  end

  # GET /polls/1 or /polls/1.json
  def show
  #   render status: :ok, json: { poll: @poll.as_json(include: {
  #     options: {
  #       only: [:option, :id, :vote]
  #     }
  #   })
  # }
  end

  # POST /polls or /polls.json
  def create
    # @poll = Poll.new(poll_params)
    # authorize @poll
    # if @poll.save
    #   render status: :ok, json: { notice: "Poll created successfully!" }
    # else
    #   render status: :unprocessable_entity, json: { error: @poll.errors.full_messages.to_sentence}
    # end
    
  end

  # PATCH/PUT /polls/1 or /polls/1.json
  def update
    # if @poll.update(poll_params)
    #   render status: :ok, json: {}
    # else
    #   errors = @poll.errors.full_messages
    #   render status: :unprocessable_entity, json: { errors: errors }
    # end
  end

  # DELETE /polls/1 or /polls/1.json
  def destroy
    # authorize @poll
    # if @poll.destroy
    #   render status: :ok, json: { 
    #     notice: 'Poll deleted successfully.'
    #   }
    # else
    #   errors = @poll.errors.full_messages
    #   render status: :unprocessable_entity, json: { errors: errors }
    # end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def load_poll
      @poll = Poll.find_by_slug!(params[:slug])
    rescue ActiveRecord::RecordNotFound => e
      render json: { errors: e }, status: :not_found
    end

    # Only allow a list of trusted parameters through.
    def poll_params
      params.require(:poll).permit(:title)
    end
end
