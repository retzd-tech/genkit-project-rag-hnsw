#!/bin/bash

# Check if .env file exists
if [ ! -f .env ]; then
  echo ".env file not found!"
  exit 1
fi

# Read each line in the .env file
while IFS= read -r line || [[ -n "$line" ]]; do
  # Skip empty lines and lines starting with #
  if [[ -z "$line" || "$line" == \#* ]]; then
    continue
  fi

  # Extract the key and value from the line
  key=$(echo "$line" | cut -d '=' -f 1)
  value=$(echo "$line" | cut -d '=' -f 2-)

  # Export the key and value as an environment variable
  export "$key"=$value

  genkit start
done < .env

echo "Environment variables set successfully."
