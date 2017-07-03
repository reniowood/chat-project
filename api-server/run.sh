#!/bin/bash
bin/bundle exec rails db:create
bin/bundle exec rails db:migrate
bin/bundle exec rails s