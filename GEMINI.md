# GEMINI.md — Ecosystem Context

> Tầng này: ecosystem — assets, cross-engine research, GitHub.
> KHÔNG can thiệp: shader code, module structure của từng engine.
> Chi tiết skills: `.gemini/README.md`
> → Đọc `THREEJS/CLAUDE.md` cho Three.js detail.
> → Đọc `BABYLONJS/CLAUDE.md` cho Babylon.js detail.

---

## Vai trò của Gemini trong ecosystem

| Gemini làm | Claude Code làm |
|---|---|
| Tìm module trong engine library | Tích hợp module vào project |
| Viết `SUMMARY.md` cho handoff | Đọc `SUMMARY.md`, adapt code |
| Push code lên GitHub | Code + review |
| Research thị trường AI 3D | Build shaders + modules |
| Quản lý `assets/` catalog | Import asset vào scene |

**Không overlap:** Gemini không viết shader code. Claude không push GitHub hay research market.

---

## Workspace layout

```
Web-3D/                    ← Ecosystem root (mở Gemini ở đây)
├── .gemini/               ← Brain Gemini (file này thuộc đây)
├── .claude/               ← Brain Claude Code (đừng sửa)
├── assets/                ← Shared 3D assets — Gemini quản lý catalog
├── SYNC.md                ← Shared AI log — đọc đầu mỗi session
├── GEMINI.md              ← File này
├── THREEJS/               ← Three.js engine (Phase A đang build)
│   └── threejs-modules/   ← Module library — Gemini tìm ở đây
└── BABYLONJS/             ← Babylon.js engine (Phase B — sau Phase A)
    └── babylon-modules/   ← Module library — Gemini tìm ở đây (khi Phase B bắt đầu)
```

---

## 4 Quy tắc không ngoại lệ

**1. Không viết shader code** — mọi TSL/WGSL/GLSL là việc của Claude Code.

**2. SUMMARY.md bắt buộc khi handoff** — khi tìm xong module, luôn viết `SUMMARY.md` trước khi báo Claude. Format: `.gemini/skills/handoff-to-claude/SKILL.md`.

**3. Không sửa `src/imported/[name]/`** — giữ nguyên để diff. Chỉ Claude mới adapt.

**4. Asset chỉ import từ `production/`** — chỉ dùng path `assets/[category]/[name]/production/`.

---

## Trạng thái hiện tại

### Phase A — THREEJS (đang build)

```
THREEJS/threejs-modules/ build order:
  1. GlobalUniforms      (utils)    — unit-pass ✅
  2. RuntimeGuard        (utils)    — unit-pass ✅
  3. TriplanarMapping    (shaders)  — chưa code
  4. WorldNoise          (shaders)  — chưa code
  5. RoundedCorners      (shaders)  — chưa code

assets/ — chưa có asset nào
```

### Phase B — BABYLONJS (chưa bắt đầu)

```
BABYLONJS/babylon-modules/ build order (mirror Phase A để so sánh 2 engine):
  1. GlobalUniforms      (utils)    — chưa code
  2. TriplanarMapping    (shaders)  — chưa code
  3. WorldNoise          (shaders)  — chưa code
  4. RoundedCorners      (shaders)  — chưa code
```

---

## File quan trọng cần đọc khi bắt đầu task

| Task | File cần đọc |
|---|---|
| Bắt đầu session bất kỳ | `SYNC.md` — trạng thái hiện tại + quyết định gần nhất |
| Tìm module Three.js | `THREEJS/threejs-modules/README.md` → catalog |
| Tìm module Babylon.js | `BABYLONJS/babylon-modules/README.md` → catalog (khi Phase B bắt đầu) |
| Đọc rules engine Three.js | `THREEJS/CLAUDE.md` |
| Đọc rules engine Babylon.js | `BABYLONJS/CLAUDE.md` |
| Handoff sang Claude | `.gemini/skills/handoff-to-claude/SKILL.md` |
| Push GitHub | `.gemini/skills/github-push/SKILL.md` |
| Research market | `.gemini/skills/market-research/SKILL.md` |
| Thêm/track asset | `.gemini/skills/asset-pipeline/SKILL.md` |
| Bộ luật asset | `assets/README.md` → catalog + rules |
| Xem tất cả assets đã validate | `assets/REGISTRY.json` — auto-generated, đừng sửa tay |
| Tính năng nên làm sau (Three.js) | `THREEJS/deferred/README.md` |
