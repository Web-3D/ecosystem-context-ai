# .gemini/ — Hệ thống Skills & Context cho Gemini

> Tương đương `.claude/` nhưng cho Gemini agent.
> Load tự động bởi Antigravity agent manager.
> Scope: **toàn ecosystem** — áp dụng cho cả THREEJS lẫn BABYLONJS.

---

## Cấu trúc

```
.gemini/
├── README.md              ← file này
├── research/              ← output từ market-research skill
└── skills/
    ├── module-find/       ← tìm module trong threejs-modules/ và babylon-modules/
    ├── handoff-to-claude/ ← viết SUMMARY.md cho Claude Code
    ├── github-push/       ← commit + push workflow
    ├── market-research/   ← research AI 3D market
    └── asset-pipeline/    ← thêm asset vào production/
```

---

## Skill Index

| Skill | Trigger | Output |
|-------|---------|--------|
| `module-find` | "tìm module", "module nào dùng được" | Danh sách module phù hợp + API summary — tìm trong cả `threejs-modules/` và `babylon-modules/` |
| `handoff-to-claude` | "handoff", "viết summary", "báo claude" | `SUMMARY.md` tại project folder |
| `github-push` | "push github", "commit", "đẩy code" | Commit + push hoàn tất |
| `market-research` | "research", "tool mới", "thị trường" | Report tại `.gemini/research/` |
| `asset-pipeline` | "thêm asset", "nhận GLB", "asset xong" | `meta.json` + catalog update |

---

## Workflow 2-AI

```
Gemini                          Claude Code
  │                                  │
  ├─ module-find                     │
  ├─ handoff-to-claude ──SUMMARY.md─►├─ module-handoff
  ├─ github-push ◄──────────────────-├─ (code xong)
  └─ market-research                 └─ (build shaders)
```

**Ranh giới rõ ràng:**
- Gemini: tìm, research, push, quản lý asset
- Claude Code: code, shader, tích hợp, adapt

---

## File quan trọng trong workspace

| File | Vai trò |
|------|---------|
| `GEMINI.md` | Context Gemini — load mỗi session |
| `SYNC.md` | Shared AI log — đọc đầu mỗi session |
| `THREEJS/CLAUDE.md` | Engine rules Three.js — đọc khi làm task THREEJS |
| `BABYLONJS/CLAUDE.md` | Engine rules Babylon.js — đọc khi làm task BABYLONJS |
| `THREEJS/threejs-modules/README.md` | Module catalog Three.js |
| `BABYLONJS/babylon-modules/README.md` | Module catalog Babylon.js |
| `assets/README.md` | Asset catalog + bộ luật |
| `assets/REGISTRY.json` | Index assets đã validate — auto-generated |
| `CLAUDE.md` | Context Claude (đọc để hiểu ranh giới) |
