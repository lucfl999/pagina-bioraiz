#!/bin/bash

# Script de inicialización de base de datos para Railway

echo "Inicializando base de datos BIORAIZ..."

# Conectarse a la DB y crear el schema
psql $DATABASE_URL -f database/schema.sql

echo "✓ Base de datos inicializada exitosamente"
echo "✓ Tablas creadas: subscribers, form_submissions, tickets, email_logs, api_keys"
