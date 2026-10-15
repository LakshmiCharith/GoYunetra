import https from 'https';

const testUrls = [
  ['Rishikesh Trayambakeshwar', 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Trayambakeshwar_Temple_VK.jpg/1280px-Trayambakeshwar_Temple_VK.jpg'],
  ['Rishikesh Lakshman Jhula', 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Rishikesh-Lakshman_Jhula_by_Kaustubh_Nayyar.jpg/1280px-Rishikesh-Lakshman_Jhula_by_Kaustubh_Nayyar.jpg'],
  ['Hampi Virupaksha', 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Wide_angle_of_Galigopuram_of_Virupaksha_Temple%2C_Hampi_%2804%29_%28cropped%29.jpg/1280px-Wide_angle_of_Galigopuram_of_Virupaksha_Temple%2C_Hampi_%2804%29_%28cropped%29.jpg'],
  ['Munnar Tea Hills', 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Munnar_Overview.jpg/1280px-Munnar_Overview.jpg'],
  ['Meghalaya Root Bridge', 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Living_root_bridges%2C_Nongriat_village%2C_Meghalaya2.jpg/1280px-Living_root_bridges%2C_Nongriat_village%2C_Meghalaya2.jpg'],
  ['Golden Temple Amritsar', 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/The_Golden_Temple_of_Amrithsar_7.jpg/1280px-The_Golden_Temple_of_Amrithsar_7.jpg'],
  ['Udaipur City Palace', 'https://upload.wikimedia.org/wikipedia/commons/6/69/Udaipur_City_Palace.jpg'],
  ['Varanasi Ahilya Ghat', 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Ahilya_Ghat_by_the_Ganges%2C_Varanasi.jpg/1280px-Ahilya_Ghat_by_the_Ganges%2C_Varanasi.jpg']
];

async function check(label, url) {
  return new Promise((resolve) => {
    https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8'
      }
    }, (res) => {
      resolve({ label, status: res.statusCode });
    }).on('error', (err) => resolve({ label, status: err.message }));
  });
}

(async () => {
  for (const [label, url] of testUrls) {
    const res = await check(label, url);
    console.log(`${res.status === 200 ? '✅' : '❌'} [${res.status}] ${res.label}`);
  }
})();
