const welcomeScreen = document.getElementById('welcome-screen');
const inputScreen = document.getElementById('input-screen');
const celebrationScreen = document.getElementById('celebration-screen');
const leftSlide = document.getElementById('left-slide');
const rightSlide = document.getElementById('right-slide');
const backgroundControls = document.getElementById('background-controls');

const startButton = document.getElementById('start-button');
const dateForm = document.getElementById('date-form');
const anniversaryDate = document.getElementById('anniversary-date');
const chooseLeftButton = document.getElementById('choose-left-button');
const chooseRightButton = document.getElementById('choose-right-button');
const backButtonLeft = document.getElementById('back-button-left');
const backButtonRight = document.getElementById('back-button-right');
const finishButton = document.getElementById('finish-button'); 

const bgButtons = document.querySelectorAll('.bg-button');


let leftClicked = false;
let rightClicked = false;

function switchScreen(from, to) {
    from.classList.remove('visible');
    from.classList.add('hidden');
    to.classList.remove('hidden');
    to.classList.add('visible');
}

function checkFinishButton() {
    if (leftClicked && rightClicked) {
        finishButton.classList.remove('hidden'); 
    }
}

finishButton.addEventListener('click', () => {
    Swal.fire({
        title: 'Apakah kamu yakin?',
        text: 'kamu akan menyelesaikan perayaan ini.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Selesai',
        cancelButtonText: 'Kembali',
        confirmButtonColor: '#28a745',
        cancelButtonColor: '#d33',
        reverseButtons: true 
    }).then((result) => {
     
        if (result.isConfirmed) {
            Swal.fire({
                title: 'Terima Kasih!',
            
                icon: 'success',
                confirmButtonText: 'Tutup',
                confirmButtonColor: '#28a745'
            }).then(() => {
            
                leftClicked = false;
                rightClicked = false;
                finishButton.classList.add('hidden'); 
                
                switchScreen(celebrationScreen, welcomeScreen);
                anniversaryDate.value = ''; 
                backgroundControls.style.display = 'block'; 
            });
        } else {
            
            Swal.fire({
                title: 'Kamu masih bisa melanjutkan!',
                text: 'Silakan lanjutkan merayakan.',
                icon: 'info',
                confirmButtonText: 'Lanjutkan',
                confirmButtonColor: '#17a2b8'
            });
        }
    });
});

startButton.addEventListener('click', () => {
    backgroundControls.style.display = 'none';
    switchScreen(welcomeScreen, inputScreen);
});

dateForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const selectedDate = new Date(anniversaryDate.value);
    const correctDate = new Date('2023-12-15');

    
    if (selectedDate.toDateString() !== correctDate.toDateString()) {
        Swal.fire({
            title: 'Oops!',
            text: 'Ih parah kamu lupa?!!',
            icon: 'error',
            confirmButtonText: 'Coba Lagi',
            background: '#f8d7da',
            color: '#721c24',
            confirmButtonColor: '#721c24',
            showClass: {
                popup: 'animate__animated animate__shakeX'
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOut'
            }
        }).then(() => {
            anniversaryDate.value = '';  
        });
    } else {
        Swal.fire({
            title: 'Selamat!',
            text: 'Yeayy! Kamu inget tanggalnya.',
            icon: 'success',
            confirmButtonText: 'Lanjutkan',
            confirmButtonColor: '#28a745',
            background: '#d4edda',
            color: '#155724',
            showClass: {
                popup: 'animate__animated animate__bounceIn'
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOut'
            }
        }).then(() => {
            switchScreen(inputScreen, celebrationScreen);
        });
    }
});

chooseLeftButton.addEventListener('click', () => {
    leftClicked = true; 
    checkFinishButton(); 
    switchScreen(celebrationScreen, leftSlide);
});

chooseRightButton.addEventListener('click', () => {
    rightClicked = true; 
    checkFinishButton(); 
    switchScreen(celebrationScreen, rightSlide);
});

backButtonLeft.addEventListener('click', () => {
    switchScreen(leftSlide, celebrationScreen);
});

backButtonRight.addEventListener('click', () => {
    switchScreen(rightSlide, celebrationScreen);
});

bgButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const bgValue = button.dataset.bg;
        document.body.style.background = bgValue.includes('#') ? bgValue : `url(${bgValue})`;
        document.body.style.backgroundSize = 'cover';
        document.body.style.backgroundPosition = 'center';
    });
});
