# Reusable GitHub Composite Actions

This repository contains a collection of reusable GitHub composite actions for Node.js projects.

Composite actions run as steps inside the caller's job rather than as separate jobs, so the caller is responsible for `runs-on`, `permissions`, `timeout-minutes`, and `actions/checkout`.

## Available Actions

### Node CI

Installs dependencies with pnpm and runs `init`, `lint`, `build`, and `test` scripts.

**Path**: `ci-node`

**Usage**:

```yaml
name: CI
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]
    types: [opened, synchronize]

jobs:
  ci:
    runs-on: ubuntu-latest
    timeout-minutes: 15
    steps:
      - uses: actions/checkout@v6
      - uses: stevezhu/actions/ci-node@v2
```

### Node CI (Turbo)

CI optimized for Turborepo monorepos. Runs `lint`, `build`, and `test` with `--affected`.

**Path**: `ci-node-turbo`

**Usage**:

```yaml
name: CI
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]
    types: [opened, synchronize]

jobs:
  ci:
    runs-on: ubuntu-latest
    timeout-minutes: 15
    steps:
      - name: Get fetch depth
        id: get_fetch_depth
        run: echo "fetch_depth=$((${{ github.event.pull_request.commits || 1 }} + 1))" >> $GITHUB_OUTPUT
      - uses: actions/checkout@v6
        with:
          fetch-depth: ${{ steps.get_fetch_depth.outputs.fetch_depth }}
      - uses: stevezhu/actions/ci-node-turbo@v2
```

### NPM Publish

Runs lint/test/build then publishes to NPM with provenance.

**Path**: `npm-publish`

**Usage**:

```yaml
name: Publish
on:
  release:
    types: [published]

jobs:
  publish:
    runs-on: ubuntu-latest
    timeout-minutes: 15
    permissions:
      contents: read
      id-token: write
    steps:
      - uses: actions/checkout@v6
      - uses: stevezhu/actions/npm-publish@v2
        with:
          npm-token: ${{ secrets.NPM_TOKEN }}
```

### NPM Bump Version

Bumps the `package.json` version and opens a PR with the change.

**Path**: `npm-bump-version`

**Usage**:

```yaml
name: Bump Package Version
on:
  workflow_dispatch:
    inputs:
      version_type:
        description: 'Version bump type'
        required: true
        default: 'patch'
        type: choice
        options:
          - patch
          - minor
          - major

jobs:
  bump-version:
    runs-on: ubuntu-latest
    timeout-minutes: 10
    permissions:
      contents: write
      pull-requests: write
    steps:
      - uses: actions/checkout@v6
      - uses: stevezhu/actions/npm-bump-version@v2
        with:
          version_type: ${{ inputs.version_type }}
```

### Lint PR Title

Validates PR titles follow the Conventional Commits specification.

**Path**: `lint-pr-title`

**Usage**:

```yaml
name: Lint PR Title
on:
  pull_request:
    types:
      - opened
      - reopened
      - edited
      # - synchronize (if you use required Actions)

jobs:
  main:
    runs-on: ubuntu-latest
    timeout-minutes: 5
    permissions:
      pull-requests: read
    steps:
      - uses: stevezhu/actions/lint-pr-title@v2
```
