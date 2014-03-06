require 'spec_helper'

describe PublicationsController do
  it 'should be true' do
    expect {
      post :create, publication: {url: 'https://news.ycombinator.com/rss', name: 'eric'}
    }.to change(Publication, :count).by(1)
  end
end
