require 'spec_helper'

describe 'publication requests' do

  # notice let! (not a lazy evaluation)
  let!(:user) { create(:user, password: 'password', password_confirmation: 'password') }

  # creates a valid session for the user so he/she
  # has the ability to create a feed
  before { login_user }

  describe 'create' do

    # these objects were built around what I saw the Feedzilla code doing in the controllers
    # they are standin objects to prevent actually having to make a request to the outside

    # entry is standin object for a feed entry
    let(:entry) { double('article', title: 'one', id: 1, summary: "", published: "") }
    # feed is a standin object for the response from Feedzilla::Feed.fetch_and_parse
    let(:feed) { double('feed', entries: [ entry ], title: 'cnn', url: 'feed.cnn.com') }

    # here we just tell RSpec to make sure this method is called and supply the
    # fake data back so our code can run
    before { Feedzirra::Feed.should_receive(:fetch_and_parse).with("feed.cnn.com").and_return(feed) }

    it 'creates the publication' do
      expect {
        xhr :post, publications_path(publication: {url: 'feed.cnn.com'})
      }.to change {
        Publication.count
      }.by(1)
    end

    it 'adds the articles from the feed to the publication' do
      expect {
        xhr :post, publications_path(publication: {url: 'feed.cnn.com'})
      }.to change{
        Article.count
      }.by(1)
    end

  end

  def login_user
    post(user_session_path(user: {email: user.email, password: 'password'}))
  end

end
