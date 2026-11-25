# CLAUDE.md

## Git workflow

Pull requests in this repo are opened by a bot, not by you (see [`.github/workflows/claude-open-pr.yml`](.github/workflows/claude-open-pr.yml)).

- Always work on a branch named `claude/<short-topic>`.
- Make the first commit on the branch a clear one: its subject becomes the PR title and its body the PR description (the PR is created from the first commit).
- Push the branch. Do **not** open a PR: no `gh pr create`, no GitHub MCP `create_pull_request`, no "Create PR" button. The workflow opens it, and later pushes update it.
- To change the PR title or description after it is open, ask the user, or edit it only if they ask you to.
