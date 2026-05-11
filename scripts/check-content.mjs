import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const requiredSourceCollections = ['briefs', 'timeline'];
const contentRoot = path.join(root, 'src', 'content');
const signalsRoot = path.join(root, 'src', 'data', 'signals');

function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return walk(full);
    return /\.(md|mdx)$/.test(entry.name) ? [full] : [];
  });
}

function walkFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return walkFiles(full);
    return [full];
  });
}

function frontmatter(file) {
  const raw = fs.readFileSync(file, 'utf8');
  const match = raw.match(/^---\n([\s\S]*?)\n---/);
  return match?.[1] ?? '';
}

const failures = [];

for (const collection of requiredSourceCollections) {
  for (const file of walk(path.join(contentRoot, collection))) {
    const fm = frontmatter(file);
    if (!fm.includes('sources:')) {
      failures.push(`${path.relative(root, file)} 缺少 sources 字段`);
    }
    if (!/url:\s*["']?https?:\/\//.test(fm)) {
      failures.push(`${path.relative(root, file)} 缺少至少一个来源 URL`);
    }
    if (!/accessed:\s*\d{4}-\d{2}-\d{2}/.test(fm)) {
      failures.push(`${path.relative(root, file)} 缺少 accessed 访问日期`);
    }
  }
}

for (const file of walkFiles(signalsRoot).filter((item) => item.endsWith('.json'))) {
  const relative = path.relative(root, file);
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  if (!Number.isInteger(data.year)) failures.push(`${relative} 缺少 year`);
  if (!Array.isArray(data.events) || data.events.length === 0) {
    failures.push(`${relative} 缺少 events`);
    continue;
  }
  for (const [index, event] of data.events.entries()) {
    const prefix = `${relative} events[${index}]`;
    if (!event.date || !/^\d{4}-\d{2}-\d{2}$/.test(event.date)) {
      failures.push(`${prefix} 缺少 YYYY-MM-DD 日期`);
    }
    if (!event.title) failures.push(`${prefix} 缺少 title`);
    if (!event.summary) failures.push(`${prefix} 缺少 summary`);
    if (!event.impact) failures.push(`${prefix} 缺少 impact`);
    if (!event.source?.url || !/^https?:\/\//.test(event.source.url)) {
      failures.push(`${prefix} 缺少 source.url`);
    }
    if (!event.source?.publisher) failures.push(`${prefix} 缺少 source.publisher`);
    if (!event.source?.accessed || !/^\d{4}-\d{2}-\d{2}$/.test(event.source.accessed)) {
      failures.push(`${prefix} 缺少 source.accessed`);
    }
  }
}

if (failures.length > 0) {
  console.error('内容检查失败：');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('内容检查通过。');
