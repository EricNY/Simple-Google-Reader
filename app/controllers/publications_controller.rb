class PublicationsController < ApplicationController
  before_action :set_publication, only: [:show, :edit, :update, :destroy]

  # GET /publications
  # GET /publications.json
  def index
    @publications = current_user.publications
  end

  # GET /publications/1
  # GET /publications/1.json
  def show
  end

  # GET /publications/new
  def new
    @publication = Publication.new
  end

  # GET /publications/1/edit
  def edit
  end

  # POST /publications
  # POST /publications.json
  def create

    feed = Feedzirra::Feed.fetch_and_parse(publication_params[:url])

    attrs = { :name => feed.title, :url => feed.url, :user_id => current_user.id, :feed_url => publication_params[:feed_url] }
    @publication = Publication.new(attrs)

    articles = []

    feed.entries.each do |entry|
      unless Article.exists?(:guid => entry.id)
      # unless exists? :guid => entry.id
        articles << Article.new(
          :name             => entry.title,
          :summary          => entry.summary,
          :url              => feed.url,
          :published_at     => entry.published,
          :guid             => entry.id,
          # :publication_id   => publication.id,
          :user_id          => current_user.id,
          :publication_name => feed.title
        )
      end
    end
    @publication.articles = articles


    respond_to do |format|
      if @publication.save
        format.html { redirect_to @publication, notice: 'Publication was successfully created.' }
        format.json { render action: 'show', status: :created, location: @publication }
      else
        format.html { render action: 'new' }
        format.json { render json: @publication.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /publications/1
  # PATCH/PUT /publications/1.json
  def update
    respond_to do |format|
      if @publication.update(publication_params)
        format.html { redirect_to @publication, notice: 'Publication was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: 'edit' }
        format.json { render json: @publication.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /publications/1
  # DELETE /publications/1.json
  def destroy
    @publication.destroy
    respond_to do |format|
      format.html { redirect_to publications_url }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_publication
      @publication = Publication.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def publication_params
       params.require(:publication).permit(:url, :name, :id, :feed_url )
    end
end
