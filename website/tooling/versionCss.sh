#!/usr/bin/env bash

# Terminate on first error
set -e

echo "Versioning CSS file..."

if [ $# -lt 3 ]
then
    echo "Usage: $0 css_path css_file_wo_ext ext"
    exit 1
fi

if [ ! -d $1 ]
then
    echo "First argument should be a directory"
    exit 1
fi

ASSETS_DIR=$1
CSS_BASE_NAME=$2
CSS_EXT=$3

ORIGINAL_CSS="$ASSETS_DIR/$CSS_BASE_NAME.$CSS_EXT"

if [ ! -f $ORIGINAL_CSS ]
then
    echo "No file found: $ORIGINAL_CSS"
    exit 1
fi

CHKSUM=`md5sum $ORIGINAL_CSS | cut -d ' ' -f 1`
echo "md5sum of $ORIGINAL_CSS is $CHKSUM"

VERSIONED_CSS_FILE="$CSS_BASE_NAME.$CHKSUM.$CSS_EXT"
VERSIONED_CSS_FILE_PATH="$ASSETS_DIR/$VERSIONED_CSS_FILE"

echo "Renaming $ORIGINAL_CSS to $VERSIONED_CSS_FILE_PATH"
mv $ORIGINAL_CSS $VERSIONED_CSS_FILE_PATH

echo -e "{\n\"cssHash\": \"$CHKSUM\",\n\"cssFilePath\": \"$VERSIONED_CSS_FILE_PATH\",\n\"cssFile\": \"$VERSIONED_CSS_FILE\"\n}" > $ASSETS_DIR/assets.json
