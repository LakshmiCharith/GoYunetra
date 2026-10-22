import https from 'https';
import fs from 'fs';
import path from 'path';

const outDir = 'd:/travel-app/public/images';
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const imagesToDownload = [
  {
    name: 'amritsar-golden-temple.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/The_Golden_Temple_of_Amrithsar_7.jpg/1280px-The_Golden_Temple_of_Amrithsar_7.jpg'
  },
  {
    name: 'amritsar-jallianwala.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Jallianwala_Bagh%2C_Amritsar_01.jpg/1280px-Jallianwala_Bagh%2C_Amritsar_01.jpg'
  },
  {
    name: 'udaipur-city-palace.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/6/69/Udaipur_City_Palace.jpg'
  },
  {
    name: 'udaipur-lake-pichola.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/d/d2/Udaipur_Lake_India.JPG'
  },
  {
    name: 'varanasi-ghats.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Ahilya_Ghat_by_the_Ganges%2C_Varanasi.jpg/1280px-Ahilya_Ghat_by_the_Ganges%2C_Varanasi.jpg'
  },
  {
    name: 'varanasi-aarti.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Dasaswamedh_ghat-varanasi_india-andres_larin.jpg/1280px-Dasaswamedh_ghat-varanasi_india-andres_larin.jpg'
  },
  {
    name: 'rishikesh-ram-jhula.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Trayambakeshwar_Temple_VK.jpg/1280px-Trayambakeshwar_Temple_VK.jpg'
  },
  {
    name: 'hampi-virupaksha.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Wide_angle_of_Galigopuram_of_Virupaksha_Temple%2C_Hampi_%2804%29_%28cropped%29.jpg/1280px-Wide_angle_of_Galigopuram_of_Virupaksha_Temple%2C_Hampi_%2804%29_%28cropped%29.jpg'
  },
  {
    name: 'munnar-tea-gardens.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Munnar_Overview.jpg/1280px-Munnar_Overview.jpg'
  },
  {
    name: 'meghalaya-root-bridge.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Living_root_bridges%2C_Nongriat_village%2C_Meghalaya2.jpg/1280px-Living_root_bridges%2C_Nongriat_village%2C_Meghalaya2.jpg'
  }
];

function download(item) {
  return new Promise((resolve) => {
    const dest = path.join(outDir, item.name);
    const file = fs.createWriteStream(dest);
    https.get(item.url, {
      headers: {
        'User-Agent': 'GoYunetraTravelApp/2.0 (contact@goyunetra.app)'
      }
    }, (res) => {
      if (res.statusCode === 200) {
        res.pipe(file);
        file.on('finish', () => {
          file.close();
          const size = fs.statSync(dest).size;
          console.log(`✅ [${res.statusCode}] Saved ${item.name} (${Math.round(size/1024)} KB)`);
          resolve(true);
        });
      } else {
        file.close();
        if (fs.existsSync(dest)) fs.unlinkSync(dest);
        console.log(`❌ [${res.statusCode}] Failed ${item.name}`);
        resolve(false);
      }
    }).on('error', (err) => {
      file.close();
      if (fs.existsSync(dest)) fs.unlinkSync(dest);
      console.log(`❌ [ERR] ${item.name}: ${err.message}`);
      resolve(false);
    });
  });
}

(async () => {
  for (const item of imagesToDownload) {
    await download(item);
    // wait 800ms between requests to avoid rate limits
    await new Promise(r => setTimeout(r, 800));
  }
  console.log('Download batch completed.');
})();
