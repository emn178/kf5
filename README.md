# KF5

A library to integrate with KF5 help desk.[逸創云客服](http://www.kf5.com/)

## Installation

Add this line to your application's Gemfile:

```ruby
gem 'kf5'
```

And then execute:

    bundle

Or install it yourself as:

    gem install kf5

For rails, create config `config/initializers/kf5.rb`
```ruby
KF5.configure do |config|
  config.key = "your key of KF5 service"
  config.domain = "your domain of KF5 service"

  # if you use devise, it will fetch following information from current_user if exsit
  config.properties.username = :your_username_column # default is username
  config.properties.name = :your_name_column # default is name
  config.properties.phone = :your_phone_column # default is phone
end
```

## Usage

In rails controllers, you can call `redirect_to_kf5` to redirect_to_kf5 for SSO. This will fetch information from `current_user` automatically if you use devise:
```ruby
// ... my controller
def my_action
  redirect_to_kf5
end
```
Or you can assaign arguments manaully
```ruby
// ... my controller
def my_action
  redirect_to_kf5 :username => 'username' // others....
end
```

## License

The gem is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).

## Contact
The project's website is located at https://github.com/emn178/kf5  
Author: emn178@gmail.com
