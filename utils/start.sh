#!/bin/bash

start_backend() {
  echo "Starting backend service..."
  cd ../backend/services/transactions || exit
  npm install
  npm run start &
  BACKEND_PID=$!
  cd - || exit
}

start_frontend() {
  echo "Starting frontend application..."
  cd ../frontend/currency-converter || exit
  npm install
  npm run dev &
  FRONTEND_PID=$!
  cd - || exit
}

stop_services() {
  echo "Stopping services..."
  kill $BACKEND_PID
  kill $FRONTEND_PID
  exit 0
}

start_backend
start_frontend

trap stop_services INT

wait
