#!/bin/bash
command -v shellcheck > /dev/null && shellcheck "$0"

# only run this in one job of the build matrix
if [[ "${TRAVIS_OS_NAME:-}" != "linux" || "${TRAVIS_NODE_VERSION:-}" != "10" ]]; then
  echo "Skipping docker publishing"
  exit 0
fi

# Note this assumes it runs in a CI and depends on the following variables being set
# TRAVIS_BRANCH = "master"
# DOCKER_USER_NAME = **username for docker hub**
# DOCKER_PASSWORD = **secret from docker hub**
# TRAVIS_TAG = (optional if there is a git tag on this )

# It also assumes to run in the root directory of the project

BUILD_VERSION=$(echo "${TRAVIS_COMMIT}" | cut -c 1-10);

echo "BUILD_VERSION: $BUILD_VERSION"
echo "TRAVIS_BRANCH: $TRAVIS_BRANCH"
echo "TRAVIS_TAG: $TRAVIS_TAG"
echo "TRAVIS_PULL_REQUEST_BRANCH: $TRAVIS_PULL_REQUEST_BRANCH"

if [[ "$TRAVIS_BRANCH" == "master" ]] && [[ "$TRAVIS_TAG" == "" ]] && [[ "$TRAVIS_PULL_REQUEST_BRANCH" == "" ]]; then
  echo "Building master"
  docker build --pull -t "iov1/wallet-demo:${BUILD_VERSION}" .
  docker login -u "$DOCKER_USERNAME" -p "$DOCKER_PASSWORD";
  docker tag  "iov1/wallet-demo:${BUILD_VERSION}" "iov1/wallet-demo:latest";
  docker push "iov1/wallet-demo:latest";
  docker logout;
fi;

if [[ "$TRAVIS_TAG" != "" ]]; then
  echo "Building tag $TRAVIS_TAG"
  docker build --pull -t "iov1/wallet-demo:${BUILD_VERSION}" .
  docker login -u "$DOCKER_USERNAME" -p "$DOCKER_PASSWORD";
  docker tag  "iov1/wallet-demo:${BUILD_VERSION}" "iov1/wallet-demo:${TRAVIS_TAG}";
  docker push "iov1/wallet-demo:${TRAVIS_TAG}";
  docker logout;
fi;
