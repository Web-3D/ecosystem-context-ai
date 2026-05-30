# SYNC.md — Shared AI Context Log

> File này là **bảng thông báo tiến độ** của Claude Code (xử lý toàn bộ ecosystem từ 2026-05-29).
> Đọc đầu mỗi session để biết trạng thái hiện tại mà không cần giải thích lại.
>
> **KHÔNG thay thế:**
> - `.claude/skills/module-handoff/` — quy trình Claude tích hợp module vào project (HOW)
>
> **Ghi khi:** breaking API change, quyết định kiến trúc, cross-engine decision.
> **Không ghi:** tạo/xóa module thông thường (→ Living Index), bug fix, typo, format code.

---

## Bảng tổng — tất cả engines

| Engine     | Phase hiện tại                    | Trạng thái              | Modules done | Ghi chú                             |
| ---------- | --------------------------------- | ----------------------- | ------------ | ----------------------------------- |
| `THREEJS`  | Phase E ✅ hoàn thành             | ✅ Phase A–E xong       | 29 / 29      | +3 Phase E: InteractionSystem, AnimationSystem, ScrollTimeline. Docs site live 2026-05-17. |
| `BABYLONJS`| Phase D — Polish & Deploy         | ✅ Hoàn thành           | 14 / 14      | Phase A+B+C+D done. Phase E feasibility study tiếp theo |

> Tiến trình chi tiết → [`/ROADMAP.md`](ROADMAP.md) (nguồn duy nhất cho status).

**Shared assets:** `assets/` — chưa có asset nào, REGISTRY.json trống.

---

## THREEJS

**26 modules — Phase A–D ✅ hoàn thành.**
Gallery: `00-Threejs/src/gallery/` — 16 live canvas cards. Chưa tích hợp vào scene thực tế.
→ Module index + next steps: [`/ROADMAP.md`](ROADMAP.md)

### Log [THREEJS]

#### 2026-05-30 — Claude Code (cấu trúc: ui/ + known-issues/ + atelier decision)
- **Category module mới `ui/`** — widget DOM thuần (companion UI cho 3D tool, KHÔNG Three.js). Module đầu: `Tabs` (folder-style, ARIA + keyboard). `validate.js` whitelist thêm `ui`.
- **`known-issues/` — hệ thống mới** ở THREEJS root: catalog lỗi thường gặp `KI-NNN` (meta tag category/severity/status). Phân định rõ: `decisions/` = thay đổi cấu trúc lớn · `known-issues/` = lỗi thường gặp.
- **Quyết định atelier ↔ ArchPlan (đang thiết kế, chưa code):** palette node = consumer RUNTIME của atelier (đọc generated palette-index 1 chiều, không live cross-repo import). Model chốt: bảng swatch-lưới + cọ click-3D (pick layer vô hình vì tường merge). Sync mechanism dùng lại Phase 1 generated-file của atelier. ADR sẽ ghi sau spike.
- **Repo 01-Doraemon có remote** → `github.com/Web-3D/Doraemon.git` (trước đó local-only).

#### 2026-05-18 — Claude Code (Phase E hoàn thành)
- **Phase E unit-pass** — 3 modules: InteractionSystem, AnimationSystem, ScrollTimeline
- **InteractionSystem** — Raycaster wrapper: hover/click/pointerEnter/Leave trên bất kỳ Object3D nào, không global state
- **AnimationSystem** — AnimationMixer wrapper: play/crossFade/pause/stop glTF AnimationClip, warnMissing helper
- **ScrollTimeline** — scroll → CatmullRomCurve3 camera path, lookAt fixed|tangent, smooth lerp

#### 2026-05-17 — Claude Code (Docs site + GEMINI.md sync)
- **Docs site live** — VitePress tại `c:\Docs\`, deploy https://docs-3d-ng.vercel.app/
- **GitHub repo** — https://github.com/NgQuan86/web3d-docs (public, auto-redeploy qua Vercel)
- **sync.js** — copy 37+ MD files từ mọi project, `node sync.js --push` để update
- **GEMINI.md cập nhật** — module count 20→26, thêm Factory + Docs vào workspace layout, thêm module index table
- **6 modules mới (untracked, chưa commit vào THREEJS):** BaseGPUEffect, BeamEffect, BillboardSprite, ShockwaveRing, BaseShaderMaterial, BaseWorld

#### 2026-05-16 — Claude Code (Tooling + Refactor)
- **shaders/ restructured** — 3 subfolders: `foundation/` (WorldNoise), `vertex/` (WindAnimation, ProceduralFracture, VATShader), `fragment/` (TriplanarMapping, InteriorMapping, RoundedCorners, DissolveShader)
- **GlobalUniforms v2.0.0 — breaking change** — singleton class + `inject()` → 3 exported TSL `uniform()` nodes + helper functions. Import trực tiếp, không cần `inject()`. Xem `utils/GlobalUniforms/README.md`
- **Scripts mới** — `find-unused.js` (orphan/stale import detector) + `lint-shaders.js` (TSL/GLSL policy enforcer)
- **VERSION_INDEX.md xóa** — `meta.json` là nguồn duy nhất cho version; `scan-versions.js` đọc trực tiếp
- **ARCHITECTURE.md** — thêm File Registry (định danh vai trò từng file trong workspace)
- **WEEKLY-CHECK.md** — thêm bước 2: kiểm tra npm packages định kỳ cả 2 workspaces
- `update-index.js` + `validate.js` + `find-unused.js` — hỗ trợ 2-level module depth (shaders/vertex/WindAnimation)
- `gallery/modules.ts` — fix 7 stale import paths (SparkSystem + GPUParticleSystem: components/ → effects/; 5 shaders: thêm subfolder prefix)

#### 2026-05-15 — Claude Code (Phase D + Gallery)
- **Phase D hoàn thành** — 3 modules unit-pass: PostProcessing (WebGPU bloom), WindAnimation (triNoise3D positionNode), DayNightCycle (sun arc + ambient)
- **Phase C hoàn thành** — VATShader, LODBillboard, CharacterPool unit-pass
- **Gallery update** — 16 modules có live canvas demo tại `00-Threejs/src/gallery/`

#### 2026-05-14 — Claude Code
- `GPUParticleSystem` (components) — unit-pass ✅ | base class GPU particles, builder functions pattern, `ParticleNodeContext`, `ParticleNode` type via `ShaderNodeObject<Node>`
- **Kiến trúc:** `SparkSystem` refactored → wrap `GPUParticleSystem` (composition, không phải inheritance). Public API SparkSystem giữ nguyên 100%.
- Cross-module import: `SparkSystem` import từ `../GPUParticleSystem` — được phép khi documented trong `meta.json` dependencies

#### 2026-05-13 — Claude Code (session 2)
- `SparkSystem` (components) — unit-pass ✅ | GPU-driven particles, `PointsNodeMaterial`, TSL, 3 emitter shapes, turbulence
- **Phase B hoàn thành** — 4/4 modules unit-pass
- tsconfig path alias `threejs-modules/*` — dùng `vite-tsconfig-paths`, không dùng `file:` protocol
- `package.json` exports map đã thêm vào `threejs-modules/` (chuẩn bị npm publish sau này)
- `LODSystem` (utils) — unit-pass ✅ | wrap `THREE.LOD`, typed levels, autoUpdate
- `ProceduralFracture` (shaders) — unit-pass ✅ | `triNoise3D` vertex displacement along normal
- `InteriorMapping` (shaders) — unit-pass ✅ | tangent-space parallax, per-room hash variation

#### 2026-05-13 — Claude Code
- `WorldNoise` (shaders) — unit-pass ✅ | `triNoise3D` built-in, world-space animated noise
- `RoundedCorners` (shaders) — unit-pass ✅ | UV-space SDF, transparent `NodeMaterial`
- **Phase A hoàn thành** — 5/5 modules unit-pass
- `TriplanarMapping` (shaders) — unit-pass ✅ | import từ `three/webgpu`, `three/tsl`
- Fix `RuntimeGuard/example.ts` — đổi sang `WebGPURenderer` (WebGLRenderer không có `render.drawCalls`)

#### 2026-05-12 — Claude Code
- Tạo `BABYLONJS/` engine skeleton — `CLAUDE.md` + `babylon-modules/`
- Cập nhật `SYNC.md` → cấu trúc multi-engine (sections per engine)
- Cập nhật root `CLAUDE.md`, `GEMINI.md`, `.claude/README.md`, `.gemini/README.md` — link đúng cả 2 engine
- Init git ecosystem root → github.com/Web-3D/ecosystem-context-ai (public)
- Init git BABYLONJS → github.com/NgQuan86/babylonjs-modules (public)

#### 2026-05-09 — Claude Code
- Setup workspace root git repo (`THREEJS/`) — track AI instructions + scripts + skills
- Thêm `assets/REGISTRY.json` (auto-updated bởi validate.js sau mỗi asset PASS)
- Thêm caching vào `validate.js` — skip re-validate nếu file không đổi (hash MD5)
- Thêm `SYNC.md`, `DEFERRED.md`
- Gitignored: `.validate-cache.json`, `settings.local.json`, 3 subproject repos

---

## BABYLONJS

**14/14 modules — Phase A+B+C+D ✅ hoàn thành (2026-05-18).** Phase E (feasibility study) tiếp theo.
→ Module index: [`/ROADMAP.md`](ROADMAP.md)

### Log [BABYLONJS]

#### 2026-05-18 — Claude Code (Phase D hoàn thành)
- **PostProcessing** unit-pass ✅ — `DefaultRenderingPipeline`: bloom auto-apply qua `scene.render()`, không cần `pp.render()` như Three.js
- **WindAnimation** unit-pass ✅ — ShaderMaterial GLSL: TSL `triNoise3D` → value noise3D tự impl; object-space + `worldViewProjection`
- **DayNightCycle** unit-pass ✅ — `THREE.AmbientLight` → `HemisphericLight`; `light.position` → `light.direction`; `Color3.Lerp()` thay mutate-in-place
- **Phase D ✅ hoàn thành** — 3/3 modules, tổng 14 modules toàn engine

#### 2026-05-18 — Claude Code (Phase A bắt đầu)
- Tạo `00-Babylon/` project — Vite + TypeScript + Babylon.js 8.56.2
- `RuntimeGuard` unit-pass ✅ — adapt từ THREEJS, dùng `SceneInstrumentation.drawCallsCounter` + `scene.totalActiveIndicesPerfCounter.current / 3`
- `TriplanarMapping` unit-pass ✅ — NME programmatic wiring: `TriPlanarBlock` (built-in) + `TransformBlock` cho world pos/normal
- `WorldNoise` unit-pass ✅ — NME: `SimplexPerlin3DBlock` + `AnimatedInputBlockTypes.RealTime` (không cần update() thủ công)
- `RoundedCorners` unit-pass ✅ — ShaderMaterial GLSL: UV SDF, engine auto-convert WGSL
- **Phase B hoàn thành:** LODSystem (Mesh.addLODLevel), ProceduralFracture (GLSL vertex displacement), InteriorMapping (GLSL parallax + UV derivatives), SparkSystem (GPUParticleSystem + NoiseProceduralTexture)
- **Phase C hoàn thành:** VATShader (GLSL ES3 + gl_VertexID), LODBillboard (BILLBOARDMODE_ALL plane), CharacterPool (TransformNode generic pool)

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
- Quyết định kiến trúc quan trọng ảnh hưởng nhiều engine
- Thay đổi cross-engine (đổi convention, đổi cấu trúc thư mục chung)
- Update trạng thái phase (module xong → update bảng tổng + bảng engine)

**Không ghi:** tạo module mới (→ Living Index tự update), bug fix, typo, format code.

**Format mỗi entry:**
```
#### YYYY-MM-DD — Claude Code
- [Nội dung thay đổi ngắn gọn — 1 dòng mỗi thay đổi]
```

**Thêm engine mới:** thêm 1 dòng vào Bảng tổng + 1 section `## TENENGINE` mới.
