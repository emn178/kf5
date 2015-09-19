require 'digest'
require 'uri'

require "kf5/version"
require "kf5/configuration"
require "kf5/properties"
require "kf5/helper"
require "kf5/view_helper"

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
        ActiveSupport.on_load :action_view do
          include KF5::ViewHelper
        end
        Rails.application.config.assets.precompile += %w( kf5.js )
      end
    end
  end
end
