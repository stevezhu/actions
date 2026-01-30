# Reusable GitHub Actions Workflows

This repository contains a collection of reusable GitHub Actions workflows for Node.js projects.

## Available Workflows

### CI Node.js

Standard CI workflow for Node.js projects. Runs install, lint, build, and test.

**File**: `.github/workflows/ci-node.yaml`

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
    uses: stevezhu/actions/.github/workflows/ci-node.yaml@v1.0.0
```

### CI Node.js (Turbo)

CI workflow optimized for Monorepos using Turborepo. Checks for affected packages.

**File**: `.github/workflows/ci-node-turbo.yaml`

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
    uses: stevezhu/actions/.github/workflows/ci-node-turbo.yaml@v1.0.0
```

### NPM Publish

Automates publishing packages to the NPM registry. Requires `NPM_TOKEN` secret to be set in the repository or organization.

**File**: `.github/workflows/npm-publish.yaml`

**Usage**:

```yaml
name: Publish
on:
  release:
    types: [published]

jobs:
  publish:
    uses: stevezhu/actions/.github/workflows/npm-publish.yaml@v1.0.0
    permissions:
      contents: read
      id-token: write
    secrets: inherit # Add this to inherit NPM_TOKEN from repo secrets if needed
```

### NPM Bump Version

Automates version bumping (patch, minor, major) and creating release PRs.

**File**: `.github/workflows/npm-bump-version.yaml`

**Usage**:

```yaml
name: Bump Package Version
on:
  workflow_dispatch:
    inputs:
      version_type:
        description: "Version bump type"
        required: true
        default: "patch"
        type: choice
        options:
          - patch
          - minor
          - major

jobs:
  bump-version:
    uses: stevezhu/actions/.github/workflows/npm-bump-version.yaml@v1.0.0
    permissions:
      contents: write
      pull-requests: write
    with:
      version_type: ${{ inputs.version_type }}
```

### Lint PR Title

Validates that PR titles follow the Conventional Commits specification.

**File**: `.github/workflows/lint-pr-title.yaml`

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
    uses: stevezhu/actions/.github/workflows/lint-pr-title.yaml@v1.0.0
```
