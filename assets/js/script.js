document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-links a');
    const contentSections = document.querySelectorAll('.content-section');
    const musicItems = document.querySelectorAll('.music-item');
    let currentPlayingAudio = null;
    let currentPlayingButton = null;

    // 导航栏点击事件，显示对应内容区
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);

            navLinks.forEach(nav => nav.classList.remove('active'));
            link.classList.add('active');

            contentSections.forEach(section => {
                section.classList.remove('active');
            });
            document.getElementById(targetId).classList.add('active');

            // 如果切换到其他页面，停止所有音频播放并重置状态
            if (currentPlayingAudio && targetId !== 'music') {
                currentPlayingAudio.pause();
                currentPlayingAudio.currentTime = 0;
                if (currentPlayingButton) {
                    currentPlayingButton.textContent = '播放 / 暂停';
                    currentPlayingButton.classList.remove('playing');
                }
                currentPlayingAudio = null;
                currentPlayingButton = null;
            }
        });
    });

    // 为每个音乐作品添加播放功能
    musicItems.forEach(item => {
        const audio = item.querySelector('audio');
        const playButton = item.querySelector('.play-button');
        
        // 创建“从头播放”按钮
        const restartButton = document.createElement('button');
        restartButton.className = 'restart-button';
        item.querySelector('.music-controls').appendChild(restartButton);

        // 播放/暂停按钮功能
        playButton.addEventListener('click', () => {
            if (audio.paused) {
                // 如果有其他音乐正在播放，先暂停它
                if (currentPlayingAudio && currentPlayingAudio !== audio) {
                    currentPlayingAudio.pause();
                    currentPlayingAudio.currentTime = 0;
                    currentPlayingButton.textContent = '播放 / 暂停';
                    currentPlayingButton.classList.remove('playing');
                }
                
                // 播放当前音乐
                audio.play();
                playButton.textContent = '暂停';
                playButton.classList.add('playing');
                currentPlayingAudio = audio;
                currentPlayingButton = playButton;
            } else {
                // 暂停当前音乐
                audio.pause();
                playButton.textContent = '播放 / 暂停';
                playButton.classList.remove('playing');
                currentPlayingAudio = null;
                currentPlayingButton = null;
            }
        });

        // “从头播放”按钮功能
        restartButton.addEventListener('click', () => {
            if (currentPlayingAudio && currentPlayingAudio !== audio) {
                // 暂停上一个音频
                currentPlayingAudio.pause();
                currentPlayingAudio.currentTime = 0;
                currentPlayingButton.textContent = '播放 / 暂停';
                currentPlayingButton.classList.remove('playing');
            }
            
            audio.currentTime = 0; // 重置到开头
            audio.play();
            playButton.textContent = '暂停';
            playButton.classList.add('playing');
            currentPlayingAudio = audio;
            currentPlayingButton = playButton;
        });

        // 音乐播放结束时，按钮文本和颜色恢复
        audio.addEventListener('ended', () => {
            playButton.textContent = '播放 / 暂停';
            playButton.classList.remove('playing');
            currentPlayingAudio = null;
            currentPlayingButton = null;
        });
    });

    // 初始化：确保默认显示主页
    document.querySelector('.nav-links a[href="#home"]').click();
});