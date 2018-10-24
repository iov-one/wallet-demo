#!/bin/bash

# Note this assumes it runs in a CI and depends on the following variables being set
# TRAVIS_BRANCH = "master"
# DOCKER_USER_NAME = **username for docker hub**
# DOCKER_PASSWORD = **secret from docker hub**
# TRAVIS_TAG = (optional if there is a git tag on this )

# It also assumes to run in the root directory of the project

BUILD_VERSION=$(echo ${TRAVIS_COMMIT} | cut -c 1-10);

if [[ "$TRAVIS_BRANCH" == "master" ]]; then
  docker build --pull -t "iov1/wallet-demo:${BUILD_VERSION}" .
  docker login -u "$DOCKER_USERNAME" -p "$DOCKER_PASSWORD";

  # always push latest from a successful master build
  docker tag  "iov1/wallet-demo:${BUILD_VERSION}" "iov1/wallet-demo:latest";
  docker push "iov1/wallet-demo:latest";

  # also push a tag (eg. v0.1.0) if there is a git tag for this
  if [[ "$TRAVIS_TAG" != "" ]]; then
    docker tag  "iov1/wallet-demo:${BUILD_VERSION}" "iov1/wallet-demo:${TRAVIS_TAG}";
    docker push "iov1/wallet-demo:${TRAVIS_TAG}";
  fi

  docker logout;
else
  echo "Only build docker images on master: ${BUILD_VERSION} / ${TAG}";
fi
