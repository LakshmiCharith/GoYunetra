import https from 'https';

const photoIds = [
  // Amritsar candidates
  'photo-1605649487212-47bdab064df7',
  'photo-1588714477688-cf28a50e94f7',
  'photo-1595846519845-68e298c2edd8',
  'photo-1514222709107-a180c68d72b4',
  'photo-1623051016606-f686618d363b',

  // Udaipur candidates
  'photo-1615836245337-f5b9b2303f10',
  'photo-1591289009723-aef0a1a8a211',
  'photo-1585123388867-3bfe6dd4bdbf',
  'photo-1609137144813-7d9921338f24',

  // Varanasi candidates
  'photo-1561361513-2d000a50f0dc',
  'photo-1571536802807-30451e3955d8',
  'photo-1596176530529-78163a4f7af2',
  'photo-1627894483216-2138af692e32',

  // Rishikesh candidates
  'photo-1584551246679-0daf3d275d0f',
  'photo-1607604276583-eef5d076aa5f',
  'photo-1626014303757-646c20536c4b',
  'photo-1600100397608-f010f443b711',

  // Hampi candidates
  'photo-1600100397608-f010f443b711',
  'photo-1620766182966-c6eb5ed2b788',
  'photo-1590050752117-238cb0fb12b1',

  // Munnar candidates
  'photo-1593693397690-362cb9666fc2',
  'photo-1516690561799-46d8f74f9abf',
  'photo-1506744038136-46273834b3fb'
];

async function getUnsplashTitle(photoId) {
  const url = `https://unsplash.com/photos/${photoId}`;
  return new Promise((resolve) => {
    https.get(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const titleMatch = data.match(/<title>([^<]+)<\/title>/i);
        const descMatch = data.match(/<meta\s+name="description"\s+content="([^"]+)"/i);
        resolve({
          id: photoId,
          status: res.statusCode,
          title: titleMatch ? titleMatch[1] : 'No title',
          desc: descMatch ? descMatch[1] : ''
        });
      });
    }).on('error', (err) => resolve({ id: photoId, status: 'ERR', title: err.message }));
  });
}

(async () => {
  for (const id of photoIds) {
    const res = await getUnsplashTitle(id);
    console.log(`[${res.id}] (${res.status}): ${res.title.substring(0, 80)}`);
  }
})();
