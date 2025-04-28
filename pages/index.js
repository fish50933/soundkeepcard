import { useEffect, useState } from 'react';

export default function Home() {
    const [cards, setCards] = useState([]);

    // 獲取語音卡片資料
    const fetchAudioFiles = async () => {
        const response = await fetch('/api/getAudioFiles');
        const data = await response.json();
        setCards(data.files);
    };

    // 提交語音卡片
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        const message = document.getElementById('message').value;
        const audioFile = document.getElementById('audio').files[0];

        formData.append('message', message);
        formData.append('audio', audioFile);

        const response = await fetch('/api/uploadAudio', {
            method: 'POST',
            body: formData,
        });

        if (response.ok) {
            alert('語音卡片創建成功！');
            fetchAudioFiles(); // 重新抓取最新的卡片
        } else {
            alert('創建失敗，請重試。');
        }
    };

    useEffect(() => {
        fetchAudioFiles(); // 初始化載入現有卡片
    }, []);

    return (
        <div style={{ textAlign: 'center' }}>
            <div className="form-container">
                <h2>創建您的語音卡片</h2>
                <form onSubmit={handleSubmit}>
                    <label for="message">祝福語：</label>
                    <input type="text" id="message" name="message" placeholder="輸入您的祝福語" required />
                    <br /><br />
                    <label for="audio">上傳音頻：</label>
                    <input type="file" id="audio" name="audio" accept="audio/*" required />
                    <br /><br />
                    <button type="submit">提交</button>
                </form>
            </div>

            <div id="cards-container">
                {cards.map((item, index) => (
                    <div key={index} className="card">
                        <h1>{item.file.replace('.mp3', '')} - Voice Message</h1>
                        <div className="audio-player">
                            <audio controls>
                                <source src={`/assets/audio/${item.file}`} type="audio/mp3" />
                                Your browser does not support the audio element.
                            </audio>
                        </div>
                        <div className="message">{item.message}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}
