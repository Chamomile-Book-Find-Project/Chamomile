FROM docker.elastic.co/logstash/logstash:7.17.0

# COPY DB_txt.csv ./
# COPY starting.conf ./
# RUN logstash-plugin install logstash-input-jdbc

# RUN logstash-plugin install logstash-filter-json


RUN logstash-plugin install logstash-input-mongodb

RUN logstash-plugin install logstash-output-mongodb