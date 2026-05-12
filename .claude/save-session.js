#!/usr/bin/env node
/**
 * PreCompact hook — lưu compact summary vào memory/sessions/
 * Input: JSON từ stdin do Claude Code cung cấp khi compact
 * Output: file YYYY-MM-DD_HHMM.md trong memory/sessions/
 */

const fs   = require('fs');
const path = require('path');

const SESSIONS_DIR = path.join(
  'C:\\Users\\nguye\\.claude\\projects\\c--Web-3D\\memory\\sessions'
);
const INDEX_FILE = path.join(SESSIONS_DIR, 'INDEX.md');

// Đọc stdin
let raw = '';
process.stdin.setEncoding('utf8');
process.stdin.on('data', chunk => { raw += chunk; });

process.stdin.on('end', () => {
  let data = {};
  try { data = JSON.parse(raw); } catch { data = { raw_text: raw }; }

  // Tạo timestamp cho tên file
  const now      = new Date();
  const datePart = now.toISOString().slice(0, 10);               // YYYY-MM-DD
  const timePart = now.toTimeString().slice(0, 5).replace(':', ''); // HHMM
  const filename = `${datePart}_${timePart}.md`;
  const filepath = path.join(SESSIONS_DIR, filename);

  // Trích nội dung từ payload Claude Code gửi
  const summary      = data.summary       || data.compact_summary || '';
  const userContext  = data.user_context  || '';
  const triggerReason = data.trigger      || data.reason || 'auto-compact';

  // Viết file session
  const content = [
    `# Session — ${datePart} ${now.toTimeString().slice(0, 5)}`,
    '',
    `> Trigger: ${triggerReason}`,
    '',
    '## Summary (do Claude Code tạo)',
    '',
    summary || '_Không có summary từ Claude Code_',
    '',
    ...(userContext ? ['## User Context', '', userContext, ''] : []),
    '## Raw payload',
    '',
    '```json',
    JSON.stringify(data, null, 2),
    '```',
  ].join('\n');

  fs.writeFileSync(filepath, content, 'utf8');

  // Cập nhật INDEX.md
  updateIndex(filename, datePart, summary);

  process.stdout.write(`✅ Session saved → sessions/${filename}\n`);
});

function updateIndex(filename, datePart, summary) {
  const shortSummary = summary
    ? summary.replace(/\n/g, ' ').slice(0, 80) + (summary.length > 80 ? '…' : '')
    : '(no summary)';

  let content = fs.existsSync(INDEX_FILE)
    ? fs.readFileSync(INDEX_FILE, 'utf8')
    : '# Sessions Index\n\n| File | Ngày | Tóm tắt ngắn |\n|------|------|---|\n';

  // Xóa dòng placeholder nếu còn
  content = content.replace(/\| _\(chưa có session nào được lưu\)_.*\n/, '');

  // Thêm dòng mới vào đầu bảng (sau header)
  const newRow = `| [${filename}](${filename}) | ${datePart} | ${shortSummary} |\n`;
  content = content.replace(
    /(\| File \| Ngày \| Tóm tắt ngắn \|\n\|[-|]+\|\n)/,
    `$1${newRow}`
  );

  fs.writeFileSync(INDEX_FILE, content, 'utf8');
}
