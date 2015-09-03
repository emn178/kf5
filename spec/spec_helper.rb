$LOAD_PATH.unshift File.expand_path('../../lib', __FILE__)
require 'kf5'
require 'rspec/its'
require 'ostruct'

Dir[File.dirname(__FILE__) + "/support/**/*.rb"].each do |file|
  require file
end

KF5.configure do |config|
  config.key = "key"
  config.domain = "domain"
end
