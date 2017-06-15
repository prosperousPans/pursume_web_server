FROM node:8.1.0

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY . /usr/src/app/

RUN npm update              && \
    npm install -g grunt    && \
    npm install

EXPOSE 3000

CMD wait 10 && npm run docker

CMD curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
CMD sudo apt-get install -y nodejs

CMD node
