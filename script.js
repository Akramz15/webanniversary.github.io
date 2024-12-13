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
const finishButton = document.getElementById('finish-button'); // Tombol Selesai

const bgButtons = document.querySelectorAll('.bg-button');

// Variabel untuk melacak klik tombol kiri dan kanan
let leftClicked = false;
let rightClicked = false;

// Switch Screen Function
function switchScreen(from, to) {
    from.classList.remove('visible');
    from.classList.add('hidden');
    to.classList.remove('hidden');
    to.classList.add('visible');
}

// Fungsi untuk mengecek apakah tombol "Selesai" bisa ditampilkan
function checkFinishButton() {
    if (leftClicked && rightClicked) {
        finishButton.classList.remove('hidden'); // Tampilkan tombol "Selesai"
    }
}

// Event Tombol "Selesai"
finishButton.addEventListener('click', () => {
    // Menampilkan konfirmasi menggunakan SweetAlert2
    Swal.fire({
        title: 'Apakah Anda yakin?',
        text: 'Anda akan menyelesaikan pengalaman ini.',
        icon: 'warning',
        showCancelButton: true, // Menampilkan tombol "Tidak"
        confirmButtonText: 'Selesai',
        cancelButtonText: 'Kembali',
        confirmButtonColor: '#28a745',
        cancelButtonColor: '#d33',
        reverseButtons: true // Tombol "Ya" di sebelah kiri dan "Tidak" di sebelah kanan
    }).then((result) => {
        if (result.isConfirmed) {
            // Jika pengguna memilih "Ya"
            Swal.fire({
                title: 'Terima Kasih!',
            
                icon: 'success',
                confirmButtonText: 'Tutup',
                confirmButtonColor: '#28a745'
            }).then(() => {
                // Reset semua kondisi dan tampilan ke awal
                leftClicked = false;
                rightClicked = false;
                finishButton.classList.add('hidden'); // Sembunyikan tombol "Selesai"
                
                // Pindah kembali ke layar awal
                switchScreen(celebrationScreen, welcomeScreen);
                anniversaryDate.value = ''; // Reset input tanggal
                backgroundControls.style.display = 'block'; // Tampilkan kembali kontrol latar belakang
            });
        } else {
            // Jika pengguna memilih "Tidak", tetap berada di halaman perayaan
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

// Start Button
startButton.addEventListener('click', () => {
    backgroundControls.style.display = 'none';
    switchScreen(welcomeScreen, inputScreen);
});

// Form Submission
dateForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const selectedDate = new Date(anniversaryDate.value);

    // Correct anniversary date
    const correctDate = new Date('2023-12-15');

    // Validasi apakah tanggal yang dimasukkan sesuai dengan tanggal anniversary yang benar
    if (selectedDate.toDateString() !== correctDate.toDateString()) {
        // SweetAlert2 untuk menampilkan error
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
            anniversaryDate.value = '';  // Reset input date
        });
    } else {
        // SweetAlert2 untuk menampilkan pesan sukses
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
            // Pindah ke layar perayaan
            switchScreen(inputScreen, celebrationScreen);
        });
    }
});

// Left and Right Choice Buttons
chooseLeftButton.addEventListener('click', () => {
    leftClicked = true; // Set leftClicked menjadi true
    checkFinishButton(); // Cek apakah tombol selesai bisa ditampilkan
    switchScreen(celebrationScreen, leftSlide);
});

chooseRightButton.addEventListener('click', () => {
    rightClicked = true; // Set rightClicked menjadi true
    checkFinishButton(); // Cek apakah tombol selesai bisa ditampilkan
    switchScreen(celebrationScreen, rightSlide);
});

// Back Buttons
backButtonLeft.addEventListener('click', () => {
    switchScreen(leftSlide, celebrationScreen);
});

backButtonRight.addEventListener('click', () => {
    switchScreen(rightSlide, celebrationScreen);
});

// Background Change
bgButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const bgValue = button.dataset.bg;
        document.body.style.background = bgValue.includes('#') ? bgValue : `url(${bgValue})`;
        document.body.style.backgroundSize = 'cover';
        document.body.style.backgroundPosition = 'center';
    });
});
