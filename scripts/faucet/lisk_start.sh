#!/bin/bash
set -o errexit -o nounset -o pipefail
command -v shellcheck > /dev/null && shellcheck "$0"

# Choose from https://hub.docker.com/r/lisk/faucet/tags
FAUCET_VERSION="v0.3.1"

TMP_DIR=$(mktemp -d "${TMPDIR:-/tmp}/faucet_start_lisk.XXXXXXXXX")
LOGFILE="$TMP_DIR/faucet_lisk.log"

docker pull "alpine"
DOCKER_HOST_IP=$(docker run --rm alpine ip route | awk 'NR==1 {print $3}')

BLOCKCHAIN_URL="http://$DOCKER_HOST_IP:4000"
echo "Connecting to $BLOCKCHAIN_URL"

docker pull "iov1/iov-faucet:${FAUCET_VERSION}"
docker run --read-only \
  --name "lisk_faucet" \
  --env "FAUCET_CONCURRENCY=3" \
  --env "FAUCET_CREDIT_AMOUNT_LSK=5" \
  --env "FAUCET_MNEMONIC=wagon stock borrow episode laundry kitten salute link globe zero feed marble" \
  --env "FAUCET_PORT=8002" \
  -p 8002:8002 \
  --rm "iov1/iov-faucet:${FAUCET_VERSION}" \
  start lisk "$BLOCKCHAIN_URL" \
  > "$LOGFILE" &

echo "Faucet running and logging into $LOGFILE"

curl -sS -X POST \
  -H "Content-type: application/json" \
  -d '{"amount":"1000000000000","recipientId":"9061425315350165588L","senderPublicKey":"c094ebee7ec0c50ebee32918655e089f6e1a604b83bcaa760293c61e0f18ab6f","timestamp":83967732,"type":0,"fee":"10000000","asset":{},"signature":"92e5e8eb9ad9bd09b952c5dea6274b29554960c30b043e700c0366b6202b615f67c1b10bc9b31e0d5c30844eb7430a58b034f3924e653a18442c6a76ca3a9c00","id":"1924379852824665212"}' \
  http://localhost:4000/api/transactions
echo # add line break

# Wait until block is forged and processed
sleep 25
echo "Lisk Faucet loaded with 10000 LSK"
