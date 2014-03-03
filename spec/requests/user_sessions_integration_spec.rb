require 'spec_helper'

describe 'user sessions' do

  let(:user) { create(:user) }

  describe 'ajax login' do

    context 'proper credentials' do

      before do
        post user_session_path user: {email: user.email, password: 'password'}, content_type: :json
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
        post user_session_path user: {email: user.email, password: 'not my password'}, content_type: :json
      end

      it 'returns a successful response' do
        expect(response.status).to eq(200)
      end

      it 'has a failure object' do
        expect(JSON.parse(response.body).fetch('success')).to be_false
      end

      it 'has error messages' do
        expect(JSON.parse(response.body).fetch('errors')).to eq(["Login failed"])
      end
    end

  end

end
