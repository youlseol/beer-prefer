#!/bin/bash

set -e

usage() {
    echo "Usage: $0 --json \"<feature-description>\""
    echo "  --json: Output results in JSON format (required)"
    exit 1
}

if [ "$#" -lt 2 ]; then
    usage
fi

JSON_OUTPUT=false
FEATURE_DESC=""

while [[ $# -gt 0 ]]; do
    case $1 in
        --json)
            JSON_OUTPUT=true
            FEATURE_DESC="$2"
            shift 2
            ;;
        *)
            usage
            ;;
    esac
done

if [ -z "$FEATURE_DESC" ]; then
    echo "Error: Feature description cannot be empty"
    exit 1
fi

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../../.." && pwd)"
FEATURES_DIR="$REPO_ROOT/.specify/features"

sanitize_name() {
    echo "$1" | tr '[:upper:]' '[:lower:]' | sed -e 's/[^a-z0-9가-힣]/-/g' -e 's/--*/-/g' -e 's/^-//' -e 's/-$//' | cut -c 1-50
}

SANITIZED_NAME=$(sanitize_name "$FEATURE_DESC")
TIMESTAMP=$(date +%Y%m%d-%H%M%S)
BRANCH_NAME="feature/${SANITIZED_NAME}-${TIMESTAMP}"
FEATURE_DIR="${FEATURES_DIR}/${SANITIZED_NAME}-${TIMESTAMP}"
SPEC_FILE="${FEATURE_DIR}/spec.md"

mkdir -p "$FEATURE_DIR/checklists"

if [ -d "$REPO_ROOT/.git" ]; then
    cd "$REPO_ROOT"
    git checkout -b "$BRANCH_NAME" 2>/dev/null || git checkout "$BRANCH_NAME"
fi

touch "$SPEC_FILE"

if [ "$JSON_OUTPUT" = true ]; then
    cat <<EOF
{
  "BRANCH_NAME": "$BRANCH_NAME",
  "FEATURE_DIR": "$FEATURE_DIR",
  "SPEC_FILE": "$SPEC_FILE",
  "FEATURE_NAME": "${SANITIZED_NAME}",
  "TIMESTAMP": "$TIMESTAMP"
}
EOF
else
    echo "Branch: $BRANCH_NAME"
    echo "Feature Directory: $FEATURE_DIR"
    echo "Spec File: $SPEC_FILE"
fi
