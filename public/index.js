class MyImage {
    constructor(image) {
        this.image = image;
    }
    filterImage(filterStyle) {
        this.reset()
        this.image.style.filter = filterStyle ;
    }
    transformImage(transformStyle) {
        this.reset();
        this.image.style.transform = transformStyle ;
    }
    reset() {
        this.image.style.filter = '';
        this.image.style.transform = '';
    }
}

const imageInput = document.getElementById('image-input');
const banner = document.querySelector('.banner');
const previewImage = document.getElementById('preview-image');
const newImage = document.getElementById('new-image');
const formResults = document.getElementById('image-action');
const selectedFile = document.getElementById('selected-file');

let currentIndex = 1;
const numFilters = 5;
const bannerImage = new MyImage(banner);

function autoFilter() {
    currentIndex = currentIndex % numFilters;
    switch(currentIndex) {
        case 1:
            bannerImage.filterImage('grayscale(100%)');
            break;
        case 2:
            bannerImage.transformImage('scaleY(-1');
            break;
        case 3:
            bannerImage.filterImage('blur(1px)');
            break;
        case 4:
            bannerImage.transformImage('scaleX(-1');
            break;
        default:
            bannerImage.reset();
            break;
    }
    currentIndex += 1;
}
setInterval(autoFilter, 3000);

imageInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    // const elements = document.querySelectorAll('.on-action');
    const element = document.querySelector('.display-image')
    try {
        if (file) {

        // elements.forEach((value) => value.style.display='block');
        element.style.display = 'flex';
        const reader = new FileReader();
        selectedFile.textContent = file.name.split('.').slice(0,-1).join(" ");
        reader.onload = (e) => {
            previewImage.src = e.target.result;
            newImage.src = e.target.result;
        };
        reader.readAsDataURL(file);

    } else {

        elements.forEach((value) => value.style.display='none');
        previewImage.src = '';
        newImage.src = '';
        selectedFile.textContent = '';
        throw new error('Invalid File. Please try again with a JPG or PNG file.')
    }
}
    catch (error) {
        alert(error)
    }
})

formResults.addEventListener('change', (event) => {
    // console.log(event);
    const imageModifier = event.target.value;
    const newImage = new MyImage(previewImage);
    switch (imageModifier) {
        case 'grayscale':
            newImage.filterImage('grayscale(100%)')
            break;
        case 'blur':
            newImage.filterImage('blur(2px)')
            break;
        case 'horizontal-flip':
            newImage.transformImage('scaleX(-1)')
            break;
        case 'vertical-flip':
            newImage.transformImage('scaleY(-1)')
            break;
        default:
            newImage.reset()
            break;
        }
    });