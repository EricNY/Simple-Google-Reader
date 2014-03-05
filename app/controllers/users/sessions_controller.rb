class Users::SessionsController < Devise::SessionsController
  respond_to :html, :json

  def create
    if request.xhr?
      resource = warden.authenticate!(scope: resource_name, recall: "#{controller_path}#failure")
      sign_in_and_redirect(resource_name, resource)
    else
      super
    end

  end

  def failure
    render json: {success: false, errors: ["Login failed"]}
  end

  protected

  def sign_in_and_redirect(resource_or_scope, resource=nil)
    scope = Devise::Mapping.find_scope!(resource_or_scope)
    resource ||= resource_or_scope
    sign_in(scope, resource) unless warden.user(scope) == resource
    render json: {success: true}
  end

end
