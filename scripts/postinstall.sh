#!/bin/bash

# Skip setting of husky and git flow in pipeline environment
if [ -z "$CI" ]; then
  # Git-flow settings
  git flow init -df

  git config gitflow.prefix.versiontag v
  git config gitflow.path.hooks ./scripts/git-hooks/
  git config gitflow.release.finish.notag false
  git config gitflow.branch.master main
fi
