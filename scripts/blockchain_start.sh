# shellcheck shell=bash

# blockchain_start is called in .travis.yml or also locally before running tests
# to ensure we have all the blockchains set up for the full integration tests

if [ -z "${BASH_SOURCE[0]}" ]; then
  echo "\${BASH_SOURCE[0]} is unset or empty. This usually means your current shell does not support it.";
  echo "Please use bash do start and stop the blockchain or use your shell scripting superhero powers to show us a better solution at"
  echo "https://github.com/iov-one/iov-core"
elif ! which docker > /dev/null; then
  echo "Please install docker and grant permission to current user to start the blockchain"
else
  # get this files directory regardless of pwd when we run it
  SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

  export TM_VERSION=0.21.0
  export BNS_VERSION=v0.6.0
  docker pull iov1/tendermint:${TM_VERSION}
  docker pull iov1/bov:${BNS_VERSION}
  export BNS_ENABLED=1

  export BNS_DIR=$(mktemp -d "${TMPDIR:-/tmp}/bns_${BNS_VERSION}.XXXXXXXXX")
  chmod 777 "${BNS_DIR}"
  echo "BNS_DIR = $BNS_DIR"

  # init tendermint and bns
  docker run -v "${BNS_DIR}:/tendermint" "iov1/tendermint:${TM_VERSION}" init
  # Address is derived from HdPaths.simpleAddress(0) with mnemonic:
  # hidden ask fever furnace alter bridge rib ride banana bargain moon bacon
  docker run -v "${BNS_DIR}:/data" "iov1/bov:${BNS_VERSION}" -home "/data" \
    init CASH 5696CEB0B816B374352DEA04819226EB9E946041

  # start tendermint daemon
  BNS_PORT=23456
  docker run -p "${BNS_PORT}:26657" -v "${BNS_DIR}:/tendermint" \
    "iov1/tendermint:${TM_VERSION}" node \
    --proxy_app="unix:///tendermint/app.sock" \
    --rpc.laddr=tcp://0.0.0.0:26657 \
    --log_level=state:info,rpc:info,*:error > /tmp/bns_tm.log &
  export BNS_TM_PID=$!

  docker run -v "${BNS_DIR}:/data" "iov1/bov:${BNS_VERSION}" -home "/data" \
    start -bind="unix:///data/app.sock" > /tmp/bns_app.log &
  export BNS_APP_PID=$!

  sleep 3

  # for debug output
  cat /tmp/bns_tm.log
  cat /tmp/bns_app.log
fi
