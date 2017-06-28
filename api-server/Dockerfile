FROM ruby:2.3.1
RUN apt-get update -qq && apt-get install -y build-essential libpq-dev nodejs
RUN mkdir /myapp
WORKDIR /myapp
ADD Gemfile /myapp/Gemfile
ADD Gemfile.lock /myapp/Gemfile.lock
RUN gem install bundler && bundle install
ADD . /myapp
RUN bin/bundle exec rails db:migrate -e $RUN_ENV
CMD ["bin/bundle", "exec", "rails", "s", "-e", "$RUN_ENV"]
