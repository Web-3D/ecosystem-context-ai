# SYNC.md — Shared AI Context Log

> File này là **bảng thông báo tiến độ chung** giữa Claude Code và Gemini.
> Đọc đầu mỗi session để biết trạng thái hiện tại mà không cần giải thích lại.
>
> **KHÔNG thay thế:**
> - `.claude/skills/module-handoff/` — quy trình Claude tích hợp module (HOW)
> - `.gemini/skills/handoff-to-claude/` — quy trình Gemini viết SUMMARY.md (HOW)
> - `SUMMARY.md` trong từng project — payload cụ thể của mỗi handoff (WHAT to integrate)
>
> **Ghi khi:** breaking API change, quyết định kiến trúc, cross-engine decision.
> **Không ghi:** tạo/xóa module thông thường (→ Living Index), bug fix, typo, format code.

---

## Bảng tổng — tất cả engines

| Engine     | Phase hiện tại                    | Trạng thái      | Modules done | Ghi chú                             |
| ---------- | --------------------------------- | --------------- | ------------ | ----------------------------------- |
| `THREEJS`  | Phase A — Environment Foundation  | 🔄 Đang build   | 2 / 5        | GlobalUniforms ✅, RuntimeGuard ✅   |
| `BABYLONJS`| Phase A — Environment Foundation  | ⏳ Chưa bắt đầu | 0 / 4        | Bắt đầu sau khi THREEJS Phase A xong |

> Chi tiết từng phase → `THREEJS/ROADMAP.md` và `BABYLONJS/ROADMAP.md`.

**Shared assets:** `assets/` — chưa có asset nào, REGISTRY.json trống.

---

## THREEJS

### Trạng thái Phase A

| Module             | Status       |
| ------------------ | ------------ |
| `GlobalUniforms`   | ✅ unit-pass |
| `RuntimeGuard`     | ✅ unit-pass |
| `TriplanarMapping` | ⏳ chưa code |
| `WorldNoise`       | ⏳ chưa code |
| `RoundedCorners`   | ⏳ chưa code |

> Build order + dependency đầy đủ → `THREEJS/ROADMAP.md`

**00-Threejs:** Template sạch — chưa import module nào, `.module-lock.json` chưa có entry.

### Log [THREEJS]

#### 2026-05-12 — Claude Code
- Tạo `BABYLONJS/` engine skeleton — `CLAUDE.md` + `babylon-modules/`
- Cập nhật `SYNC.md` → cấu trúc multi-engine (sections per engine)
- Cập nhật root `CLAUDE.md`, `GEMINI.md`, `.claude/README.md`, `.gemini/README.md` — link đúng cả 2 engine
- Init git ecosystem root → github.com/NgQuan86/Web-3D-Ecosystem (public)
- Init git BABYLONJS → github.com/NgQuan86/babylonjs-modules (public)

#### 2026-05-09 — Claude Code
- Setup workspace root git repo (`THREEJS/`) — track AI instructions + scripts + skills
- Thêm `assets/REGISTRY.json` (auto-updated bởi validate.js sau mỗi asset PASS)
- Thêm caching vào `validate.js` — skip re-validate nếu file không đổi (hash MD5)
- Thêm `SYNC.md`, `DEFERRED.md`
- Gitignored: `.validate-cache.json`, `settings.local.json`, 3 subproject repos

---

## BABYLONJS

### Trạng thái Phase B

> Chưa bắt đầu. Khởi động sau khi THREEJS Phase A hoàn thành.

| Module           | Status       |
| ---------------- | ------------ |
| `GlobalUniforms` | ⏳ chưa code |
| `TriplanarMapping` | ⏳ chưa code |
| `WorldNoise`     | ⏳ chưa code |
| `RoundedCorners` | ⏳ chưa code |

### Log [BABYLONJS]

#### 2026-05-12 — Claude Code
- Tạo engine skeleton: `BABYLONJS/CLAUDE.md` + `babylon-modules/`

---

## CROSS-ENGINE

> Quyết định ảnh hưởng tất cả engines hoặc thay đổi quy ước chung của ecosystem.

### Log [CROSS]

#### 2026-05-12 — Claude Code
- Đổi tên thư mục `BABYLON/` → `BABYLONJS/` trong toàn bộ docs ecosystem

---

## Quy tắc ghi SYNC.md

**Ghi vào đây khi:**
- Breaking change API của module (params đổi tên, method bị xóa)
- Quyết định kiến trúc quan trọng ảnh hưởng cả 2 AI
- Thay đổi cross-engine (đổi convention, đổi cấu trúc thư mục chung)
- Update trạng thái phase (module xong → update bảng tổng + bảng engine)

**Không ghi:** tạo module mới (→ Living Index tự update), bug fix, typo, format code.

**Format mỗi entry:**
```
#### YYYY-MM-DD — [Claude Code | Gemini]
- [Nội dung thay đổi ngắn gọn — 1 dòng mỗi thay đổi]
```

**Thêm engine mới:** thêm 1 dòng vào Bảng tổng + 1 section `## TENENGINE` mới.
