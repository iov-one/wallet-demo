#!/bin/bash

# Based on: https://medium.com/onfido-tech/travis-surge-github-auto-deploy-every-pr-branch-and-tag-a6c8c790831f

echo "Deployment script for wallet-demo"

RANGE=500
number=$RANDOM

let "number %= $RANGE"

REPOSITORY_SLUG_ARRAY=(${TRAVIS_REPOSITORY_SLUG//\// })
REPOSITORY_OWNER=${REPOSITORY_SLUG_ARRAY[0]}
REPOSITORY_NAME=${REPOSITORY_SLUG_ARRAY[1]}
PATH=./dist
PATH_STORYBOOK=./storybook-static
SUBDOMAIN_UNFORMATTED_LIST=()

if [ "$TRAVIS_PULL_REQUEST" != "false" ]
then
  if [ "$NODE_ENV" == "production" ]
  then
    SUBDOMAIN_UNFORMATTED_LIST+=(release-${TRAVIS_PULL_REQUEST}-pr-${number})
  else
    SUBDOMAIN_UNFORMATTED_LIST+=(staging-${TRAVIS_PULL_REQUEST}-pr-${number})
  fi
elif [ -n "${TRAVIS_TAG// }" ]
then
  if [ "$NODE_ENV" == "production" ]
  then
    LATEST_TAG=`git tag | grep -v rc | sort -t. -k 1,1n -k 2,2n -k 3,3n -k 4,4n | sed '1!G;h;$!d' | sed -n 1p`
    echo $LATEST_TAG
    if [ "$TRAVIS_TAG" == "$LATEST_TAG" ]
    then
      SUBDOMAIN_UNFORMATTED_LIST+=(latest)
    fi
     SUBDOMAIN_UNFORMATTED_LIST+=(${TRAVIS_TAG}-tag)
  fi
else
  SUBDOMAIN_UNFORMATTED_LIST+=(${TRAVIS_BRANCH}-branch)
fi

for SUBDOMAIN_UNFORMATTED in "${SUBDOMAIN_UNFORMATTED_LIST[@]}"
do
  echo $SUBDOMAIN_UNFORMATTED
  SUBDOMAIN=`echo "$SUBDOMAIN_UNFORMATTED" | sed -r 's/[^A-Za-z0-9]+/\-/g'`
  echo $SUBDOMAIN
  DEPLOY_DOMAIN=https://${SUBDOMAIN}-${REPOSITORY_NAME}-${REPOSITORY_OWNER}.surge.sh
  DEPLOY_STORYBOOK=https://storybook-${SUBDOMAIN}-${REPOSITORY_NAME}-${REPOSITORY_OWNER}.surge.sh
  surge --project ${PATH} --domain $DEPLOY_DOMAIN;
  surge --project ${PATH_STORYBOOK} --domain $DEPLOY_STORYBOOK
  
  if [ "$TRAVIS_PULL_REQUEST" != "false" ]
  then
    GITHUB_PR_COMMENTS=https://api.github.com/repos/${TRAVIS_REPOSITORY_SLUG}/issues/${TRAVIS_PULL_REQUEST}/comments
    curl -H "Authorization: token ${API_ENV_GITHUB}" --request POST ${GITHUB_PR_COMMENTS} --data '{"body":"Travis automatic deployment:\r\n '${DEPLOY_DOMAIN}' \r\n \r\n Storybook book automatic deployment: \r\n '${DEPLOY_STORYBOOK}'"}'
  fi
done

echo "Deploy domain: ${DEPLOY_DOMAIN}" 