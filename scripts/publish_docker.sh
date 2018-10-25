#!/bin/bash

# Note this assumes it runs in a CI and depends on the following variables being set
# TRAVIS_BRANCH = "master"
# DOCKER_USER_NAME = **username for docker hub**
# DOCKER_PASSWORD = **secret from docker hub**
# TRAVIS_TAG = (optional if there is a git tag on this )

# It also assumes to run in the root directory of the project

BUILD_VERSION=$(echo ${TRAVIS_COMMIT} | cut -c 1-10);

[[ "$TRAVIS_TAG" != "" ]];
BUILD_TAG=$?

# always push latest from a successful master build
# BRANCH is set to master for prs targetting master, must ensure not PRs
[[ "$TRAVIS_BRANCH" == "master" ]] && [[ "$TRAVIS_PULL_REQUEST" == "" ]];
BUILD_LATEST=$?

if [[ "$BUILD_TAG" == "0" || "$BUILD_LATEST" == "0" ]]; then
  docker build --pull -t "iov1/wallet-demo:${BUILD_VERSION}" .
  docker login -u "$DOCKER_USERNAME" -p "$DOCKER_PASSWORD";

  # we may want to push both, but only need to build once
  if [[ "$BUILD_TAG" == "0" ]]; then
      docker tag  "iov1/wallet-demo:${BUILD_VERSION}" "iov1/wallet-demo:${TRAVIS_TAG}";
      docker push "iov1/wallet-demo:${TRAVIS_TAG}";
  fi
  if [[ "$BUILD_LATEST" == "0" ]]; then
    docker tag  "iov1/wallet-demo:${BUILD_VERSION}" "iov1/wallet-demo:latest";
    docker push "iov1/wallet-demo:latest";
  fi;

  docker logout;
else
  echo "Only build docker images on master: ${BUILD_VERSION} / ${TAG}";
fi
