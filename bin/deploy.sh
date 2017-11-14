#!/bin/sh
# ----------------------------------------------------------------------------


# Install before deploying
./install.sh

# deploy to artifactory
curl -u admin:password -X PUT "http://localhost:8081/artifactory/libs-snapshot-local/fr/esiee/pic/designer-webapp/0.0.1-SNAPSHOT/designer-wbapp.tar.gz" -T ../target/designer-webapp.tar.gz
