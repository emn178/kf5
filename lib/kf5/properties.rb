module KF5
  class Properties
    attr_accessor :username, :name, :phone

    def initialize(options = {})
      @username = :username
      @name = :name
      @phone = :phone
      options.each { |key, value| 
        instance_variable_set("@#{key}", value)
      }
    end
  end
end
