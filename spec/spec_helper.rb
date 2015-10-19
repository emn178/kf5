require 'simplecov'
require 'coveralls'

SimpleCov.add_filter "/spec/"
SimpleCov.add_filter "engine.rb"

if ENV["COVERAGE"]
  SimpleCov.start
elsif ENV["COVERALLS"]
  SimpleCov.formatter = Coveralls::SimpleCov::Formatter
  Coveralls.wear!
end

$LOAD_PATH.unshift File.expand_path('../../lib', __FILE__)
require 'kf5'
require 'action_view'
require 'rspec/its'
require 'ostruct'

Dir[File.dirname(__FILE__) + "/support/**/*.rb"].each do |file|
  require file
end

KF5.configure do |config|
  config.key = "key"
  config.domain = "domain"
end
