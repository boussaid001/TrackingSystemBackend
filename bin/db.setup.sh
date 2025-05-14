#!/bin/bash

# Default values
DB_HOST="127.0.0.1"
DB_PORT="3307"
DB_USER="root"
DB_PASSWORD="root"


# Assign values from command-line arguments, if provided
if [ $# -ge 5 ]; then
    DB_HOST=$1
    DB_PORT=$2
    DB_USER=$3
    DB_PASSWORD=$4
    DB_NAME=$5
else
    echo "Usage: $0 <DB_HOST> <DB_PORT> <DB_USER> <DB_PASSWORD> <DB_NAME>"
    exit 1
fi

# Check if the database exists
existing_dbs=$(mysql -h "$DB_HOST" -P "$DB_PORT" -u "$DB_USER" -p"$DB_PASSWORD" -e "SHOW DATABASES LIKE '$DB_NAME'")

if [ -n "$existing_dbs" ]; then
    echo "Database '$DB_NAME' already exists."
else
    # Create the database
    mysql -h "$DB_HOST" -P "$DB_PORT" -u "$DB_USER" -p"$DB_PASSWORD" -e "CREATE DATABASE \`$DB_NAME\`;"
    echo "Database '$DB_NAME' created."
fi
