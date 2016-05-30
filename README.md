# KF5

[![Build Status](https://api.travis-ci.org/emn178/kf5.png)](https://travis-ci.org/emn178/kf5)
[![Coverage Status](https://coveralls.io/repos/emn178/kf5/badge.svg?branch=master)](https://coveralls.io/r/emn178/kf5?branch=master)

A library to integrate with KF5 help desk.[逸創云客服](http://www.kf5.com/)

## Installation

Add this line to your application's Gemfile:

```ruby
gem 'kf5'
```

Make sure you have:

```ruby
gem 'jquery-rails'
```

And then execute:

    bundle

Or install it yourself as:

    gem install kf5

For rails, create config `config/initializers/kf5.rb`
```ruby
KF5.configure do |config|
  config.domain = "your.domain"

  # disable SSO if key is nil
  config.key = "your key of KF5 service"

  # 1: login for 30 days, 0: login for 30 minutes
  # config.remember_me = 1

  # if you use devise, it will fetch following information from current_user if exsit
  # default is :username, this is identification with email format
  config.properties.username = :your_username_column

  # default is :name, optional
  config.properties.name = :your_name_column

  # default is :phone, optional
  config.properties.phone = :your_phone_column

  # default is :photo, optional
  config.properties.photo = :your_photo_column
end
```

## Usage

In rails controllers, you can call `redirect_to_kf5` to redirect_to_kf5 for SSO. This will fetch information from `current_user` automatically if you use devise:
```ruby
# ... my controller
def my_action
  redirect_to_kf5
end
```
Or you can assaign arguments manaully
```ruby
redirect_to_kf5 :username => 'username' # others....
```
Or you do not want to sso
```ruby
redirect_to_kf5 :sso => false
```

In view, you can use `kf5_tag` to include javascript plugin.
```ruby
= kf5_tag
```

### Turbolinks
If you're using turbolinks, add the following to js file:
```JavaScript
//= require kf5.turbolinks
```

## License

The gem is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).

## Contact
The project's website is located at https://github.com/emn178/kf5  
Author: Chen, Yi-Cyuan (emn178@gmail.com)
