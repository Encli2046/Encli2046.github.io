import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const dataDir = path.join(root, 'src', 'data', 'signals');
const outDir = path.join(root, 'src', 'content', 'timeline');

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

function yamlString(value) {
  return JSON.stringify(value);
}

function yamlList(values) {
  return `[${values.map((value) => yamlString(value)).join(', ')}]`;
}

function uniqueSources(events) {
  const seen = new Set();
  const sources = [];
  for (const event of events) {
    const key = event.source.url;
    if (seen.has(key)) continue;
    seen.add(key);
    sources.push(event.source);
  }
  return sources;
}

function formatDate(date) {
  return new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).format(new Date(date));
}

function generateYear(data) {
  const sources = uniqueSources(data.events);
  const date = `${data.year}-12-31`;
  const frontmatter = [
    '---',
    `title: ${yamlString(data.title)}`,
    `description: ${yamlString(data.description)}`,
    `date: ${date}`,
    `updated: ${data.updated}`,
    `category: ${yamlString(data.category)}`,
    `tags: ${yamlList(data.tags)}`,
    'sourceType: "资料整理"',
    `year: ${data.year}`,
    'sources:',
    ...sources.flatMap((source) => [
      `  - title: ${yamlString(source.title)}`,
      `    url: ${yamlString(source.url)}`,
      `    publisher: ${yamlString(source.publisher)}`,
      `    accessed: ${source.accessed}`
    ]),
    '---',
    ''
  ].join('\n');

  const intro = [
    `本页由结构化资料池 \`src/data/signals/${data.year}.json\` 生成，用来沉淀 ${data.year} 年的互联网行业与主流技术信号。`,
    ...data.thesis,
    ''
  ].join('\n\n');

  const eventBlocks = data.events
    .sort((a, b) => a.date.localeCompare(b.date))
    .map((event) =>
      [
        `## ${formatDate(event.date)} / ${event.topic} / ${event.title}`,
        '',
        event.summary,
        '',
        `**影响判断：** ${event.impact}`,
        ''
      ].join('\n')
    )
    .join('\n');

  const closing = [
    '## 阶段性判断',
    '',
    `${data.year} 年不是单点爆发的一年，更像许多基础设施进入成熟周期的开始。`,
    '',
    '后续扩展时，应该继续补充同一年里的公司事件、产品发布、开源生态变化和生活层面的个人感受，再把事实资料与主观判断分开整理。'
  ].join('\n');

  return `${frontmatter}${intro}${eventBlocks}\n${closing}\n`;
}

if (!fs.existsSync(dataDir)) {
  console.error(`资料池目录不存在：${dataDir}`);
  process.exit(1);
}

fs.mkdirSync(outDir, { recursive: true });

const files = fs
  .readdirSync(dataDir)
  .filter((file) => /^\d{4}\.json$/.test(file))
  .sort();

for (const file of files) {
  const data = readJson(path.join(dataDir, file));
  const output = generateYear(data);
  const outFile = path.join(outDir, `${data.year}-internet-tech.md`);
  fs.writeFileSync(outFile, output);
  console.log(`生成 ${path.relative(root, outFile)}`);
}
