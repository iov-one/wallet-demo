#!/bin/bash
command -v shellcheck > /dev/null && shellcheck "$0"

# only run this in one job of the build matrix
if [[ "${TRAVIS_OS_NAME:-}" != "linux" || "${TRAVIS_NODE_VERSION:-}" != "10" ]]; then
  echo "Skipping surge deployment"
  exit 0
fi

# Based on: https://medium.com/onfido-tech/travis-surge-github-auto-deploy-every-pr-branch-and-tag-a6c8c790831f

echo "Deployment script for wallet-demo"

RANGE=500
number=$RANDOM
(( number %= RANGE ))

REPOSITORY_SLUG_ARRAY=("${TRAVIS_REPO_SLUG//\// }")
# REPOSITORY_OWNER=${REPOSITORY_SLUG_ARRAY[0]}
REPOSITORY_NAME=${REPOSITORY_SLUG_ARRAY[1]}
APP_PATH=./dist
APP_PATH_STORYBOOK=./storybook-static
SUBDOMAIN_UNFORMATTED_LIST=()

if [ "$TRAVIS_PULL_REQUEST" != "false" ]
then
  if [ "$NODE_ENV" == "production" ]
  then
    SUBDOMAIN_UNFORMATTED_LIST+=("release-pr${TRAVIS_PULL_REQUEST}-${number}")
  else
    SUBDOMAIN_UNFORMATTED_LIST+=("pr${TRAVIS_PULL_REQUEST}-${number}")
  fi
elif [ -n "${TRAVIS_TAG// }" ]
then
  if [ "$NODE_ENV" == "production" ]
  then
    LATEST_TAG=$(git tag | grep -v rc | sort -t. -k 1,1n -k 2,2n -k 3,3n -k 4,4n | sed '1!G;h;$!d' | sed -n 1p)
    echo "$LATEST_TAG"
    if [ "$TRAVIS_TAG" == "$LATEST_TAG" ]
    then
      SUBDOMAIN_UNFORMATTED_LIST+=("latest")
    fi
     SUBDOMAIN_UNFORMATTED_LIST+=("${TRAVIS_TAG}-tag")
  fi
else
  SUBDOMAIN_UNFORMATTED_LIST+=("${TRAVIS_BRANCH}-branch")
fi

for SUBDOMAIN_UNFORMATTED in "${SUBDOMAIN_UNFORMATTED_LIST[@]}"
do
  echo "$SUBDOMAIN_UNFORMATTED"
  SUBDOMAIN=$(echo "$SUBDOMAIN_UNFORMATTED" | sed -r 's/[^A-Za-z0-9]+/\-/g')
  echo "$SUBDOMAIN"
  DEPLOY_DOMAIN="https://${SUBDOMAIN}_${REPOSITORY_NAME}_iov.surge.sh"
  DEPLOY_STORYBOOK="https://storybook_${SUBDOMAIN}_${REPOSITORY_NAME}_iov.surge.sh"
  yarn surge --project "${APP_PATH}" --domain "$DEPLOY_DOMAIN"
  yarn surge --project "${APP_PATH_STORYBOOK}" --domain "$DEPLOY_STORYBOOK"
  
  if [ "$TRAVIS_PULL_REQUEST" != "false" ]
  then
    GITHUB_PR_COMMENTS=https://api.github.com/repos/${TRAVIS_REPO_SLUG}/issues/${TRAVIS_PULL_REQUEST}/comments
    curl -H "Authorization: token ${API_ENV_GITHUB}" --request POST "${GITHUB_PR_COMMENTS}" --data "{\"body\": \"Travis automatic deployment:\r\n${DEPLOY_DOMAIN}\r\n\r\nStorybook book automatic deployment:\r\n ${DEPLOY_STORYBOOK}\"}"
  fi
done

echo "Deploy domain: ${DEPLOY_DOMAIN}" 