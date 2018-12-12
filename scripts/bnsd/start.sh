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

BNSD_DIR=$(mktemp -d "${TMPDIR:-/tmp}/bnsd.XXXXXXXXX")
export BNSD_DIR
echo "BNSD_DIR = $BNSD_DIR"
bash "${SCRIPT_DIR}"/bnsd_init.sh
bash "${SCRIPT_DIR}"/bnsd_tm.sh > /tmp/bnsd_tm.log &
bash "${SCRIPT_DIR}"/bnsd_app.sh > /tmp/bnsd_app.log &

sleep 3
# for debug output
cat /tmp/bnsd_tm.log
cat /tmp/bnsd_app.log
