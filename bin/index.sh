#!/bin/bash

# Get the current directory path
CURRENT_DIR=$(pwd)

# Use the current directory path
echo "The current directory is: $CURRENT_DIR"

# Execute scripts using the current directory path
bash "$CURRENT_DIR/bin/setup.sh" &
wait
bash "$CURRENT_DIR/bin/db.setup.sh" &
wait
bash "$CURRENT_DIR/bin/db.migrations.sh" &
wait
