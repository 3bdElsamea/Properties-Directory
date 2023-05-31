import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const settingFilePath = path.join(__dirname, '../config/generalSetting.json');
const settingData = JSON.parse(fs.readFileSync(settingFilePath, 'utf8'));

const getGeneralSetting = (req, res) => {
  res.json({ data: settingData });
};

const updateGeneralSetting = (req, res, next) => {
  if (req.file) req.body.logo = req.file.location;
  const socialMedia = ['facebook', 'twitter', 'instagram', 'youtube'];
  for (const key in req.body) {
    if (socialMedia.includes(key)) {
      settingData.socialMedia[key] = req.body[key] ?? settingData.socialMedia[key];
    } else {
      settingData[key] = req.body[key] ?? settingData[key];
    }
  }
  fs.writeFileSync(settingFilePath, JSON.stringify(settingData, null, 2), 'utf8');
  res.json({ data: settingData });
};

export {
  getGeneralSetting,
  updateGeneralSetting,
};
