FROM docker.elastic.co/logstash/logstash:7.9.1

COPY DB_txt.csv ./
COPY starting.conf ./
# RUN logstash-plugin install logstash-input-jdbc

# RUN logstash-plugin install logstash-filter-json