#!/bin/bash
set -o errexit -o nounset -o pipefail
command -v shellcheck > /dev/null && shellcheck "$0"

if [ -z "$BNSD_TM_VERSION" ]; then
  echo "BNSD_TM_VERSION must be set"; exit 1
fi

if [ -z "$BNSD_VERSION" ]; then
  echo "BNSD_VERSION must be set"; exit 1
fi

if [ -z "$BOVD_DIR" ]; then
  echo "BOVD_DIR must be set"; exit 1
fi


chmod 777 "${BOVD_DIR}"

docker run --user="$UID" \
  -v "${BOVD_DIR}:/tendermint" \
  "iov1/tendermint:${BNSD_TM_VERSION}" \
  init

mv "${BOVD_DIR}/config/genesis.json" "${BOVD_DIR}/config/genesis.json.orig"

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
APP_STATE=$(<"$SCRIPT_DIR/genesis_app_state.json")
jq ". + {\"app_state\" : $APP_STATE}" \
  "${BOVD_DIR}/config/genesis.json.orig" \
  > "${BOVD_DIR}/config/genesis.json"

docker run --user="$UID" \
  -v "${BOVD_DIR}:/data" \
  "iov1/bnsd:${BNSD_VERSION}" \
  -home "/data" \
  init -i
