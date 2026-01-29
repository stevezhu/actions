# Reusable GitHub Actions Workflows

This repository contains a collection of reusable GitHub Actions workflows for Node.js projects.

## Available Workflows

### CI Node.js

Standard CI workflow for Node.js projects. Runs install, lint, build, and test.

**File**: `.github/workflows/ci-node.yml`

**Usage**:

```yaml
name: CI
on:
  push:
    branches: [main]
  pull_request:

jobs:
  ci:
    uses: stevezhu/actions/.github/workflows/ci-node.yml@main
    with:
      node-version: "20"
      # node-version-file: "package.json" # optional, defaults to package.json
```

### CI Node.js (Turbo)

CI workflow optimized for Monorepos using Turborepo. Checks for affected packages.

**File**: `.github/workflows/ci-node-turbo.yml`

**Usage**:

```yaml
name: CI Turbo
on:
  push:
    branches: [main]
  pull_request:

jobs:
  ci:
    uses: stevezhu/actions/.github/workflows/ci-node-turbo.yml@main
    with:
      node-version: "20"
```

### NPM Publish

Automates publishing packages to the NPM registry. Requires `NPM_TOKEN` secret to be set in the repository or organization.

**File**: `.github/workflows/npm-publish.yml`

**Usage**:

```yaml
name: Publish
on:
  release:
    types: [published]

jobs:
  publish:
    uses: stevezhu/actions/.github/workflows/npm-publish.yml@main
    with:
      node-version: "20"
    secrets: inherit # Inherits NPM_TOKEN from repo secrets
```

### NPM Version Bump

Automates version bumping (patch, minor, major) and creating release PRs.

**File**: `.github/workflows/npm-version-bump.yml`

**Usage**:

```yaml
name: Version Bump
on:
  workflow_dispatch:
    inputs:
      type:
        description: 'Version bump type'
        required: true
        default: 'patch'
        type: choice
        options:
          - patch
          - minor
          - major

jobs:
  bump:
    uses: stevezhu/actions/.github/workflows/npm-version-bump.yml@main
    with:
      version_type: ${{ inputs.type }}
      node-version: "20"
    secrets: inherit
```

### Lint PR Title

Validates that PR titles follow the Conventional Commits specification.

**File**: `.github/workflows/lint-pr-title.yml`

**Usage**:

```yaml
name: Lint PR Title
on:
  pull_request:
    types: [opened, edited, synchronize]

jobs:
  main:
    uses: stevezhu/actions/.github/workflows/lint-pr-title.yml@main
```