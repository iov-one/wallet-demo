#!/bin/bash

# Note this assumes it runs in a CI and depends on the following variables being set
# TRAVIS_BRANCH = "master"
# DOCKER_USER_NAME = **username for docker hub**
# DOCKER_PASSWORD = **secret from docker hub**
# TRAVIS_TAG = (optional if there is a git tag on this )

# It also assumes to run in the root directory of the project

BUILD_VERSION=$(echo ${TRAVIS_COMMIT} | cut -c 1-10);
TAG=${TRAVIS_TAG:-latest};

if [[ "$TRAVIS_BRANCH" == "master" ]]; then
  docker build --pull -t "iov1/wallet-demo:${BUILD_VERSION}" .
  docker login -u "$DOCKER_USERNAME" -p "$DOCKER_PASSWORD";
  docker tag  "iov1/wallet-demo:${BUILD_VERSION}" "iov1/wallet-demo:${TAG}";
  docker push "iov1/wallet-demo:${TAG}";
  docker logout;
else
  echo "Only build docker images on master: ${BUILD_VERSION} / ${TAG}";
fi
