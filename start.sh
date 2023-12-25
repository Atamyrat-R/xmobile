#!/bin/bash

docker-compose up -d
cd apps/api
yarn db:generate
yarn db:migrate
turbo dev