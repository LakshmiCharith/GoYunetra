import https from 'https';

const pages = [
  'Ram_Jhula',
  'Lakshman_Jhula',
  'Rishikesh',
  'Vittala_Temple,_Hampi',
  'Hampi',
  'Munnar',
  'Living_root_bridge',
  'Nohkalikai_Falls',
  'Meenakshi_Temple',
  'Harmandir_Sahib',
  'City_Palace,_Udaipur',
  'Dashashwamedh_Ghat'
];

async function getWikiPageImage(page) {
  const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(page)}`;
  return new Promise((resolve) => {
    https.get(url, { headers: { 'User-Agent': 'YatraAI-Bot/1.0 (contact@yatraai.app)' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          resolve({
            title: json.title,
            description: json.description,
            original: json.originalimage?.source,
            thumbnail: json.thumbnail?.source
          });
        } catch(e) {
          resolve(null);
        }
      });
    }).on('error', () => resolve(null));
  });
}

(async () => {
  for (const p of pages) {
    const res = await getWikiPageImage(p);
    if (res && res.original) {
      console.log(`[${p}] -> ${res.title}`);
      console.log(`  Desc: ${res.description}`);
      console.log(`  Original: ${res.original}\n`);
    } else {
      console.log(`[${p}] -> Not found\n`);
    }
  }
})();
