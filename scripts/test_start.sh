#!/bin/bash

# This runs all the scripts to set up for a local bns testing environment
# (blockchains and faucets).
# Intended as a convenience script for developers.

echo
echo ">>> Starting bns chain and faucet..."
echo
bash ./bnsd/start.sh
bash ./faucet/bnsd_start.sh

echo
echo ">>> Starting bcpd (demo) chain and faucet..."
echo
bash ./bcpd/start.sh
bash ./faucet/bcpd_start.sh

echo
echo ">>> Waiting for faucets to load tokens..."
echo
sleep 3
echo "Done!"