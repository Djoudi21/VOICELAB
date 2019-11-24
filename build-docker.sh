#!/bin/sh
docker build -t alias/voicelabs-web -f docker/Dockerfile . && \
    docker-compose -f docker/docker-compose.yml up
