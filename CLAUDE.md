# CLAUDE.md — Ecosystem Root

> Tầng này quản lý: workspace layout, shared assets, danh sách engines, vai trò AI.
> KHÔNG định nghĩa: engine rules, shader patterns, module structure, build order.
> → Đọc `THREEJS/CLAUDE.md` cho Three.js detail.
> → Đọc `BABYLONJS/CLAUDE.md` cho Babylon.js detail (sau Phase A).

---

## Workspace layout

```
Web-3D/                          ← Ecosystem root (mở Claude Code ở đây)
├── .claude/skills/              ← Skills cho tất cả engines
├── .gemini/                     ← Gemini context
├── assets/                      ← Shared 3D assets — dùng chung mọi engine
│   ├── REGISTRY.json            ← Auto-generated, không sửa tay
│   ├── buildings/
│   ├── characters/
│   ├── environments/
│   ├── props/
│   └── textures/
├── CLAUDE.md                    ← File này — ecosystem only
├── GEMINI.md                    ← Gemini ecosystem context
├── SYNC.md                      ← Shared AI log — đọc đầu mỗi session
├── THREEJS/                     ← Three.js engine (đang build — Phase A)
│   ├── CLAUDE.md                ← Engine rules — đọc khi làm việc trong THREEJS
│   ├── threejs-modules/         ← Module library
│   └── 00-Threejs/              ← Main project
└── BABYLONJS/                   ← Babylon.js engine (tạo sau Phase A)
    ├── CLAUDE.md                ← Engine rules — đọc khi làm việc trong BABYLONJS
    └── babylon-modules/         ← Module library
```

---

## Asset pipeline (shared — mọi engine dùng chung)

```
raw/ (AI tool) → optimized/ (Blender MCP) → production/ (gltf-transform)
```

Import path: `../../assets/[category]/[name]/production/` từ project con.  
Validate: `node THREEJS/validate.js assets/[category]/[name]` từ root này.

---

## Vai trò AI tại tầng ecosystem

| AI | Làm gì ở tầng này |
|---|---|
| **Claude Code** | Đọc SYNC.md, xác định engine đang làm, delegate xuống engine CLAUDE.md |
| **Gemini** | Quản lý assets/, research market, push GitHub |

**Phân quyền rõ:** Khi task thuộc về engine cụ thể → đọc engine CLAUDE.md trước khi làm.

---

## Engines

| Engine | Thư mục | Trạng thái | CLAUDE.md |
|---|---|---|---|
| Three.js | `THREEJS/` | 🔄 Phase A đang build | `THREEJS/CLAUDE.md` |
| Babylon.js | `BABYLONJS/` | ⏳ Sau Phase A | `BABYLONJS/CLAUDE.md` |
