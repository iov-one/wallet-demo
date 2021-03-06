#!/bin/bash

# This stops all the scripts to set up for a local bns testing environment
# (blockchains and faucets).
# Intended as a convenience script for developers, and counter to test_start.sh

# get this files directory regardless of pwd when we run it
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

echo
echo ">>> Stopping faucets..."
echo
bash "${SCRIPT_DIR}"/faucet/bnsd_stop.sh
bash "${SCRIPT_DIR}"/faucet/lisk_stop.sh
bash "${SCRIPT_DIR}"/faucet/ethereum_stop.sh

echo
echo ">>> Stopping bns chain..."
echo
bash "${SCRIPT_DIR}"/bnsd/stop.sh

echo
echo ">>> Stopping lisk chain..."
echo
bash "${SCRIPT_DIR}"/lisk/stop.sh

echo
echo ">>> Stopping ethereum chain and scraper..."
echo
bash "${SCRIPT_DIR}"/ethereum/scraper_stop.sh
bash "${SCRIPT_DIR}"/ethereum/stop.sh

echo "Done!"
