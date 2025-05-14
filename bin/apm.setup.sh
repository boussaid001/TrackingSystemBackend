#!/bin/bash

echo '**************************** Start APM server  *******************************'

# Pull Elasticsearch image
echo '*** Pull Elasticsearch image ***'
docker pull elasticsearch:8.4.3

# Run Elasticsearch container
echo '*** Run Elasticsearch container ***'
docker run -d --name elasticsearch --net elastic -p 9200:9200 -it -m 1GB docker.elastic.co/elasticsearch/elasticsearch:8.11.1

# Pull APM Server image
echo '*** Pull APM Server image ***'
docker pull docker.elastic.co/apm/apm-server:8.11.1

echo '*** Run APM Server container ***'
# Run APM Server container
docker run -d \
  -p 8200:8200 \
  --name=apm-server \
  --user=apm-server \
  docker.elastic.co/apm/apm-server:8.11.1 \
  --strict.perms=false -e \
  -E output.elasticsearch.hosts=\[elasticsearch:9200\]

echo '****************************  APM server  running successfully *******************************'
