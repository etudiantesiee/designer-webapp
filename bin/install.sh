#!/bin/sh
# ----------------------------------------------------------------------------

artefact_name=designer-webapp.tar.gz

# Build with node
node make

make_result=$?
if [ $make_result != 0 ]
then
	echo "Erreur lors du build de la webapp"
	return $make_result
fi

# package
tar cvfz $artefact_name ../html ../lib ../css ../conf

# Clean and/or create target folder
rm -rf ../target
mkdir ../target

# copy to target folder
cp $artefact_name ../target/

# Remove archive from bin directory
rm ./${artefact_name}