#!/bin/bash

# Default values
DB_HOST="127.0.0.1"
DB_PORT="3307"
DB_USER="root"
DB_PASSWORD="root"

# Prompt user for database host
read -p "Enter database host (default: $DB_HOST): " input_host
DB_HOST=${input_host:-$DB_HOST}

# Prompt user for database port
read -p "Enter database port (default: $DB_PORT): " input_port
DB_PORT=${input_port:-$DB_PORT}

# Prompt user for database username
read -p "Enter database username (default: $DB_USER): " input_user
DB_USER=${input_user:-$DB_USER}

# Prompt user for database password
read -s -p "Enter database password (default: $DB_PASSWORD): " input_password
DB_PASSWORD=${input_password:-$DB_PASSWORD}
echo # Newline for better formatting

# Prompt user for database name
read -p "Enter database name: " DB_NAME

# Check if the database exists
existing_dbs=$(mysql -h "$DB_HOST" -P "$DB_PORT" -u "$DB_USER" -p"$DB_PASSWORD" -e "SHOW DATABASES LIKE '$DB_NAME'")

if [ -n "$existing_dbs" ]; then
      echo "Database '$DB_NAME' already exists."
else
      # Create the database
      mysql -h "$DB_HOST" -P "$DB_PORT" -u "$DB_USER" -p"$DB_PASSWORD" -e "CREATE DATABASE \`$DB_NAME\`;"
      echo "Database '$DB_NAME' created."
fi
