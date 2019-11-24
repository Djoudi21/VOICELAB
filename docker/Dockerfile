FROM ruby:2.5.0-stretch

RUN apt update && apt install -y postgresql-client

RUN curl -sL https://deb.nodesource.com/setup_10.x | bash - && \
    apt-get install -y nodejs

RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
    echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
    apt update && apt-get install -y yarn

WORKDIR /app

COPY . .
RUN bundle install
RUN yarn install

RUN sed -i 's/#host: localhost/host: psql.voicelabs/g' config/database.yml

CMD rails server -b 0.0.0.0 -p 80
