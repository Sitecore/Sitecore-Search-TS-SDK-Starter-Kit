---
description: "Sync instructions, agents, and MCP configs to a local sibling repo for testing"
---

Run the local test sync script to copy files to `{{repoName}}`. Use Git Bash on Windows:

```powershell
& "C:\Program Files\Git\bin\bash.exe" sync/test-local.sh {{repoName}}
```

If it fails, check the error and help me fix it. After syncing, list what was copied.