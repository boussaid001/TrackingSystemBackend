#!/bin/bash

# Run prisma generate
npx prisma generate

# Run yarn prisma generate with a specific schema
yarn prisma generate --schema=./src/providers/db/prisma/schema.prisma

# Run yarn prisma migrate dev --create-only with the specified schema
yarn prisma migrate dev --create-only --schema=./src/providers/db/prisma/schema.prisma --name dev
