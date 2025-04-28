import fs from 'fs';
import path from 'path';

export default (req, res) => {
    const audioDataFile = path.join(process.cwd(), 'audioData.json');
    if (fs.existsSync(audioDataFile)) {
        const data = JSON.parse(fs.readFileSync(audioDataFile));
        res.status(200).json({ files: data });
    } else {
        res.status(200).json({ files: [] });
    }
};
