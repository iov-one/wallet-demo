#!/bin/bash
set -o errexit -o nounset -o pipefail
command -v shellcheck > /dev/null && shellcheck "$0"

# Choose from https://hub.docker.com/r/iov1/tendermint/tags/
export BNSD_TM_VERSION=0.25.0
# Choose from https://hub.docker.com/r/iov1/bnsd/tags/
export BNSD_VERSION=v0.9.3

docker pull "iov1/tendermint:${BNSD_TM_VERSION}"
docker pull "iov1/bnsd:${BNSD_VERSION}"

# get this files directory regardless of pwd when we run it
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

BOVD_DIR=$(mktemp -d "${TMPDIR:-/tmp}/bovd.XXXXXXXXX")
export BOVD_DIR
echo "BOVD_DIR = $BOVD_DIR"
bash "${SCRIPT_DIR}"/bovd_init.sh
bash "${SCRIPT_DIR}"/bovd_tm.sh > /tmp/bovd_tm.log &
bash "${SCRIPT_DIR}"/bovd_app.sh > /tmp/bovd_app.log &

sleep 3
# for debug output
cat /tmp/bovd_tm.log
cat /tmp/bovd_app.log
