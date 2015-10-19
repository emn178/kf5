class Controller
  attr_accessor :redirect_url

  include KF5::ControllerHelper

  def redirect_to(url)
    @redirect_url = url
  end
end
