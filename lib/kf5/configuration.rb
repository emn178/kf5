module KF5
  class Configuration
    attr_reader :properties
    attr_accessor :key, :domain, :remember_me

    def initialize(options = {})
      options.each { |key, value| 
        instance_variable_set("@#{key}", value)
      }
      @properties = Properties.new(options[:properties] || {})
    end
  end
end
