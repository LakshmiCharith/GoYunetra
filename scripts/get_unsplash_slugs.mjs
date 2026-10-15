import https from 'https';

const photoIds = [
  'photo-1605649487212-47bdab064df7',
  'photo-1588714477688-cf28a50e94f7',
  'photo-1595846519845-68e298c2edd8',
  'photo-1514222709107-a180c68d72b4',
  'photo-1623051016606-f686618d363b',
  'photo-1615836245337-f5b9b2303f10',
  'photo-1591289009723-aef0a1a8a211',
  'photo-1585123388867-3bfe6dd4bdbf',
  'photo-1609137144813-7d9921338f24',
  'photo-1561361513-2d000a50f0dc',
  'photo-1571536802807-30451e3955d8',
  'photo-1596176530529-78163a4f7af2',
  'photo-1627894483216-2138af692e32',
  'photo-1584551246679-0daf3d275d0f',
  'photo-1607604276583-eef5d076aa5f',
  'photo-1626014303757-646c20536c4b',
  'photo-1600100397608-f010f443b711',
  'photo-1620766182966-c6eb5ed2b788',
  'photo-1590050752117-238cb0fb12b1',
  'photo-1593693397690-362cb9666fc2',
  'photo-1516690561799-46d8f74f9abf'
];

async function checkRedirect(photoId) {
  const url = `https://unsplash.com/photos/${photoId}`;
  return new Promise((resolve) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      resolve({ id: photoId, location: res.headers.location || 'none' });
    }).on('error', (err) => resolve({ id: photoId, location: 'err: ' + err.message }));
  });
}

(async () => {
  for (const id of photoIds) {
    const res = await checkRedirect(id);
    console.log(`${res.id} -> ${res.location}`);
  }
})();
