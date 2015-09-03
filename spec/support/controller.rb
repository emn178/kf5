class Controller
  attr_accessor :redirect_url

  include KF5::Helper

  def redirect_to(url)
    @redirect_url = url
  end
end
