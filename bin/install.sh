#!/bin/sh
# ----------------------------------------------------------------------------

artefact_name=designer-webapp.tar.gz

# Build with node
node make

# package
tar cvfz $artefact_name ../html ../lib ../css ../conf

# Clean and/or create target folder
rm -rf ../target
mkdir ../target

# copy to target folder
cp $artefact_name ../target/

# Remove archive from bin directory
rm ./${artefact_name}