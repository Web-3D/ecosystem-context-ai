---
# CREDIBILITY — Độ tin cậy Skills & Modules

> Dùng khi cần biết phần nào đã được kiểm chứng từ nguồn thực, phần nào còn là ước tính.
> Cập nhật mỗi khi verify thêm — đổi status + ghi rõ nguồn.

## Status

| Symbol        | Nghĩa                                                                                   |
| ------------- | --------------------------------------------------------------------------------------- |
| ✅ Kiểm chứng | Verified từ nguồn thực: node_modules/three/src/, benchmark đo được, hoặc unit test pass |
| ⚠️ Một phần   | Một số phần verified, số liệu performance còn là ước tính từ training                   |
| 🔬 Thử nghiệm | Chưa chạy trong scene thực — logic đúng về lý thuyết nhưng chưa có kết quả đo           |

---

## Skills

| Skill                | Status        | Đã verified                                                                                                                                                    | Còn ước tính                                                                              | Cần làm để lên ✅                                 |
| -------------------- | ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- | ------------------------------------------------- |
| `dispose-pattern`    | ⚠️ Một phần   | API: `.dispose()`, `WebGLRenderTarget` — grep node_modules ✅                                                                                                  | Số liệu: "geometry 1–4 MB", "texture 16 MB" — training estimate                           | Đo VRAM thực trong Chrome Task Manager            |
| `performance-budget` | ⚠️ Một phần   | API: `render.drawCalls` — grep node_modules ✅. Limits (< 100 draw calls) là project decision                                                                  | "Frame time < 16ms" — standard 60fps math ✅. `pow() 4–8×` — training estimate            | Benchmark shader cost trong DevTools GPU track    |
| `shader-tsl`         | ⚠️ Một phần   | `NodeMaterial.colorNode/normalNode/outputNode/fragmentNode` ✅. `uniform()`, `vec3()`, `float()`, `abs`, `pow`, `dot`, `mix` ✅ — grep MathNode.js, TSLCore.js | TSL template code chưa chạy trong scene thực. Compile time "50–500ms" — training estimate | Build 1 NodeMaterial thực tế, đo compile time     |
| `global-uniforms`    | ⚠️ Một phần   | Core pattern: module đã unit-pass ✅. inject() logic verified                                                                                                  | TSL nodes (`uTimeNode`) chưa export trong module thực                                     | Update GlobalUniforms module, test uTimeNode sync |
| `gltf-pipeline`      | ⚠️ Một phần   | Pipeline order (weld→simplify→normals→draco) — gltf-transform docs ✅. `GLTFLoader.setDRACOLoader()` ✅. `DRACOLoader.setDecoderPath()` ✅                     | "draco giảm 60–80%" — typical industry number, chưa đo trong project                      | Chạy pipeline trên 1 asset thực, đo trước/sau     |
| `triplanar-mapping`  | ⚠️ Một phần   | `triplanarTexture()` built-in ✅ có trong Three.js. `positionWorld` ✅, `normalWorld` ✅ — grep Position.js, Normal.js. Class rewrite dùng built-in            | Chưa chạy trong scene thực. Built-in không có `blendSharpness` param                      | Build TriplanarMapping module, render trong scene |
| `new-module`         | ✅ Kiểm chứng | Workflow dựa trên validate.js thực tế. File structure verified bằng cách nhìn vào modules đã build                                                             | validate.js runtime "~3s" — estimate nhỏ, không ảnh hưởng quyết định                      | —                                                 |
| `module-handoff`     | ✅ Kiểm chứng | Workflow process — không có performance number cần verify. .module-lock.json schema là project convention                                                      | —                                                                                         | —                                                 |

---

## Modules (threejs-modules/)

| Module           | Status      | Đã verified                                                              | Còn ước tính                                                    | Cần làm để lên ✅                       |
| ---------------- | ----------- | ------------------------------------------------------------------------ | --------------------------------------------------------------- | --------------------------------------- |
| `GlobalUniforms` | ⚠️ Một phần | Core logic unit-pass ✅. inject() hoạt động với ShaderMaterial           | TSL nodes chưa export. Chưa test trong animation loop thực      | Export uTimeNode, test sync trong scene |
| `RuntimeGuard`   | ⚠️ Một phần | `render.drawCalls` verified từ node_modules ✅. Texture leak logic sound | Threshold "3 frames" là heuristic, chưa tune với real leak case | Test với scene thực sự có geometry leak |

---

## Nguồn được chấp nhận làm ground truth

| Nguồn                                      | Dùng để verify                             |
| ------------------------------------------ | ------------------------------------------ |
| `node_modules/three/src/`                  | Tên API, class, property, method signature |
| `node_modules/three/examples/jsm/`         | Loader, helper class                       |
| Chrome DevTools → Performance → GPU track  | Shader cost, frame time                    |
| Chrome Task Manager → GPU Memory           | VRAM leak, texture memory                  |
| `node validate.js` pass                    | Module structure hợp lệ                    |
| Unit test pass                             | Logic đúng về code flow                    |
| Benchmark đo trực tiếp trong `00-Threejs/` | Performance number thực tế                 |

**Không chấp nhận làm ground truth:**
- Training knowledge của Claude (đặc biệt cho số liệu performance)
- Tài liệu nội bộ chưa cross-check với source (CLAUDE.md, skill khác)
- Stack Overflow, blog post — dùng để tham khảo hướng đi, không phải verify số

---

## Log cập nhật

| Ngày       | Thay đổi                                                                                                   | Verified bằng gì                                                     |
| ---------- | ---------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| 2026-05-11 | `render.calls` → `render.drawCalls` trong RuntimeGuard + performance-budget     | grep node_modules/three/src/renderers/common/Info.js    |
| 2026-05-11 | `WebGPURenderTarget` không tồn tại — xóa khỏi dispose-pattern          | ls node_modules/three/src/renderers/                                 |
| 2026-05-12 | Tạo file này — baseline credibility assessment                                                             | Session review                                                       |
| 2026-05-12 | `triplanarTexture()` built-in tồn tại — rewrite skill, bỏ manual TSL implementation                        | grep node_modules/three/src/nodes/TSL.js + TriplanarTexturesNode.js  |
| 2026-05-12 | Verify: `positionWorld`, `normalWorld`, `abs`, `pow`, `dot`, `mix`, `vec3`, `float`, `uniform` — tất cả ✅ | grep Position.js, Normal.js, MathNode.js, TSLCore.js, UniformNode.js |
| 2026-05-12 | `NodeMaterial.colorNode/normalNode/outputNode/fragmentNode` — tất cả ✅                                    | grep NodeMaterial.js                                                 |
| 2026-05-12 | `GLTFLoader.setDRACOLoader()`, `DRACOLoader.setDecoderPath()` — ✅                                         | grep GLTFLoader.js, DRACOLoader.js                                   |
