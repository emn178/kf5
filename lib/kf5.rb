require 'digest'
require 'uri'

require "kf5/version"
require "kf5/configuration"
require "kf5/properties"
require "kf5/helper"

module KF5
  def self.configure(&block)
    yield configuration
  end

  def self.configuration
    @configuration ||= Configuration.new
  end

  if defined?(::Rails::Engine)
    class Engine < ::Rails::Engine
      initializer "kf5" do
        ActiveSupport.on_load :action_controller do
          include KF5::Helper
        end
      end
    end
  end
end
