require 'digest'
require 'uri'

require "kf5/version"
require "kf5/configuration"
require "kf5/properties"
require "kf5/helper"
require "kf5/view_helper"
require "kf5/controller_helper"

module KF5
  Columns = [:username, :name, :phone, :photo]

  def self.configure(&block)
    yield configuration
  end

  def self.configuration
    @configuration ||= Configuration.new
  end
end
