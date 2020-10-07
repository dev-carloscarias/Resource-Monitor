#!/bin/bash
app="api-server1"
docker build -t ${app} .
docker run -d -p 3000:80 \
  --name=${app} \
  -v $PWD:/app ${app}
