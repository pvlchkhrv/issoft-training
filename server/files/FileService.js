import config from "../config.js";
import fs from "fs";
import path from "path";

class FileService {
  writeFile(userId, file) {
    try {
      const fileName = Date.now().toString() + '.jpg';
      const filePath = `${config.assetsPath}\\${userId}`;
      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath);
      }
      fs.writeFileSync(path.join(filePath, fileName), file.data);
      return fileName;
    } catch (e) {
      console.log(e);
    }
  }

  getFile(userId, name) {
    try {
      const filePath = `${config.assetsPath}\\${userId}\\${name}`;
      return fs.readFileSync(filePath, 'base64');
    } catch (e) {
      console.log(e);
    }
  }
}

export default new FileService();
