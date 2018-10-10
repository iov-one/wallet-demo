# shellcheck shell=bash

# blockchain_stop is meant to be sourced by .travis.yml or locally after running tests

if [[ $BNS_APP_PID ]]; then
  echo "Stopping bnsd: ${BNS_TM_PID} ${BNS_APP_PID}"
  kill "${BNS_APP_PID}"
  kill "${BNS_TM_PID}"
  unset BNS_APP_PID
  unset BNS_TM_PID
  unset BNS_ENABLED
  # for debug output
  # cat /tmp/bns_app.log
fi
