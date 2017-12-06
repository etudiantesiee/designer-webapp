#!/bin/sh
# ----------------------------------------------------------------------------


# Install before deploying
./install.sh

# Artifactory conf
artifactory_host=localhost
artifactory_port=8081
artifactory_user=admin
artifactory_pwd=password

# Web app conf
web_app_name=designer-webapp
web_app_version=0.0.1-SNAPSHOT

# deploy to artifactory
curl -u ${artifactory_user}:${artifactory_pwd} -X PUT "http://${artifactory_host}:${artifactory_port}/artifactory/libs-snapshot-local/fr/esiee/pic/designer-webapp/${web_app_version}/${web_app_name}.tar.gz" -T ../target/${web_app_name}.tar.gz
