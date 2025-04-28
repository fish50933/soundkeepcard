import fs from 'fs';
import path from 'path';
import formidable from 'formidable';

export const config = {
    api: {
        bodyParser: false,
    },
};

const uploadDir = path.join(process.cwd(), 'public', 'assets', 'audio');

export default (req, res) => {
    const form = new formidable.IncomingForm();
    form.uploadDir = uploadDir;
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            res.status(500).json({ error: '上傳失敗' });
            return;
        }

        const message = fields.message;
        const audioFile = files.audio[0].newFilename;

        const audioData = { message, file: audioFile };

        const audioDataFile = path.join(process.cwd(), 'audioData.json');
        const existingData = fs.existsSync(audioDataFile) ? JSON.parse(fs.readFileSync(audioDataFile)) : [];
        existingData.push(audioData);
        fs.writeFileSync(audioDataFile, JSON.stringify(existingData, null, 2));

        res.status(200).json({ success: '音頻與祝福語儲存成功' });
    });
};
