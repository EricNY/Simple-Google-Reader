require 'spec_helper'

describe 'user sessions' do

  let(:user) { create(:user) }

  describe 'login without ajax' do

    context 'proper credentials' do

      # testing at a high level that we are calling through to devise for html requests
      it 'logs in the user' do
        post user_session_path user: {email: user.email, password: 'password'}
        expect(response).to redirect_to(root_path)
        follow_redirect!
      end

    end

  end

  describe 'ajax login' do

    context 'proper credentials' do

      before do
        xhr :post, user_session_path(user: {email: user.email, password: 'password'})
      end

      it 'is successful' do
        expect(response.status).to eq(200)
      end

      it 'has the proper content type' do
        expect(response.content_type).to eq(:json)
      end

      it 'has the proper content' do
        expect(JSON.parse(response.body).fetch('success')).to be_true
      end

    end

    context 'bad credentials' do

      before do
        xhr :post, user_session_path(user: {email: user.email, password: 'not my password'})
      end

      it 'returns a successful response' do
        expect(response.status).to eq(401)
      end

      it 'has error messages' do
        expect(response.body).to eq("Invalid email or password.")
      end
    end

  end

end
