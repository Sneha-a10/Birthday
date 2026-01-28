document.addEventListener('DOMContentLoaded', () => {
    // Buttons and elements
    const hieBtn = document.getElementById('hie-btn');
    const showBtn = document.getElementById('show-btn');
    const cat4Img = document.getElementById('cat4-img');

    // Audio assets
    const audio1 = new Audio('assets/frist screen.wav');
    const audio2 = new Audio('assets/meow.wav');
    const audio3 = new Audio('assets/Waiting.wav');
    const audio4 = new Audio('assets/Giving.wav');

    // Attempt to play first audio on load -> REMOVED
    // Note: Browsers might block this without interaction
    // audio1.play().catch(e => console.log('Autoplay blocked:', e));

    // Scenes
    const scenes = {
        1: document.getElementById('scene-1'),
        2: document.getElementById('scene-2'),
        3: document.getElementById('scene-3'),
        4: document.getElementById('scene-4'),
        5: document.getElementById('scene-5')
    };

    // Helper to switch scenes
    function switchScene(fromId, toId) {
        // Fade out
        scenes[fromId].style.opacity = '0';

        setTimeout(() => {
            scenes[fromId].classList.remove('active');
            scenes[toId].classList.add('active');

            // Force reflow
            void scenes[toId].offsetWidth;

            scenes[toId].style.opacity = '1';
        }, 500); // Match CSS transition time
    }

    // Scene 1 -> 2
    hieBtn.addEventListener('click', () => {
        switchScene(1, 2);
        setTimeout(() => {
            audio2.play();
        }, 1000);
    });

    // Scene 2 -> 3
    showBtn.addEventListener('click', () => {
        switchScene(2, 3);
        setTimeout(() => {
            audio3.play();
        }, 1000);

        // Start 5s timer for Scene 3 -> 4
        setTimeout(() => {
            switchScene(3, 4);
            setTimeout(() => {
                audio4.play();
            }, 1000);
        }, 5500); // 5000ms wait + 500ms transition buffer logic
    });

    // Video logic
    const video = document.getElementById('bday-video');
    const replayBtn = document.getElementById('replay-btn');

    // Scene 4 -> 5
    cat4Img.addEventListener('click', () => {
        switchScene(4, 5);
        // Play video and first audio after 1 second
        setTimeout(() => {
            audio1.play();
            video.play();
        }, 1000);
    });

    // Show replay button when video ends
    video.addEventListener('ended', () => {
        replayBtn.classList.remove('hidden');
    });

    // Replay functionality
    replayBtn.addEventListener('click', () => {
        video.currentTime = 0;
        video.play();
        replayBtn.classList.add('hidden');
    });
});
