#!/bin/bash

# This runs all the scripts to set up for a local bns testing environment
# (blockchains and faucets).
# Intended as a convenience script for developers.

echo
echo ">>> Stopping bcpd (demo) chain and faucet..."
echo
bash ./faucet/bcpd_stop.sh
bash ./bcpd/stop.sh

echo
echo ">>> Stopping bns chain and faucet..."
echo
bash ./faucet/bnsd_stop.sh
bash ./bnsd/stop.sh

echo "Done!"