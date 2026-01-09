#!/bin/bash
# Quick Start Script for SecurityGuard Dashboard

echo "🛡️ SecurityGuard Dashboard - Quick Start"
echo "========================================"
echo ""

# Check if .env exists
if [ ! -f .env ]; then
    echo "📋 Creating .env file from template..."
    cp .env.example .env
    echo "✓ .env created. Please edit it and add your contract address:"
    echo "  VITE_CONTRACT_ADDRESS=0x<your-address>"
    echo ""
fi

# Install dependencies if needed
if [ ! -d node_modules ]; then
    echo "📦 Installing dependencies..."
    npm install
    echo ""
fi

echo "🚀 Starting development server..."
echo "📱 Dashboard will open at: http://localhost:5173"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

npm run dev
