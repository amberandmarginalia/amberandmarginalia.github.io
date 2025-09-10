name: Generate RSS Feed


on:
  push:
    paths:
      - "blog/**"
      - "generate_rss.py"
      - ".github/workflows/rss.yml"
  workflow_dispatch:

permissions:
  contents: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Set up Python
        uses: actions/setup-python@v5
        with:
          python-version: '3.x'

      - name: Generate RSS
        run: python generate_rss.py

      - name: Commit feed
        run: |
          git config user.name "github-actions[bot]"
          git config user.email "github-actions[bot]@users.noreply.github.com"
          git add rss.xml
          git commit -m "Update RSS feed" || echo "No changes to commit"
          git push
