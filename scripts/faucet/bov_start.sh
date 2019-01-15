#!/bin/bash
set -o errexit -o nounset -o pipefail
command -v shellcheck > /dev/null && shellcheck "$0"

# Choose from https://hub.docker.com/r/iov1/iov-faucet/tags/
FAUCET_VERSION="v0.3.1"

TMP_DIR=$(mktemp -d "${TMPDIR:-/tmp}/faucet_start_bov.XXXXXXXXX")
LOGFILE="$TMP_DIR/faucet_bov.log"

docker pull "alpine"
DOCKER_HOST_IP=$(docker run --rm alpine ip route | awk 'NR==1 {print $3}')

BLOCKCHAIN_URL="ws://$DOCKER_HOST_IP:23457"
echo "Connecting to $BLOCKCHAIN_URL"

docker pull "iov1/iov-faucet:${FAUCET_VERSION}"
docker run --read-only \
  --env "FAUCET_CONCURRENCY=3" \
  --env "FAUCET_COIN_TYPE=1" \
  --env "FAUCET_MNEMONIC=degree tackle suggest window test behind mesh extra cover prepare oak script"  \
  -p 8001:8001 \
  --rm "iov1/iov-faucet:${FAUCET_VERSION}" \
  start bns "$BLOCKCHAIN_URL" \
  > "$LOGFILE" &

echo "Faucet running and logging into $LOGFILE"
