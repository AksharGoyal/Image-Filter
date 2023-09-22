/* CLASS CONSTRUCTION */
class MyImage {
    constructor(image) {
        // used for initialising the object
        this.image = image;
    }
    filterImage(filterStyle) {
        // applies filter such as blur or grayscale to image
        this.reset()
        this.image.style.filter = filterStyle ;
    }
    transformImage(transformStyle) {
        // applies transformation such as flipping vertically or horizontally
        this.reset();
        this.image.style.transform = transformStyle ;
    }
    reset() {
        // removes all the changes to the image
        this.image.style.filter = '';
        this.image.style.transform = '';
    }
}

/* DOM OBJECTS */
const imageInput = document.getElementById('image-input'); // takes the input image
const banner = document.querySelector('.banner'); // takes the banner image 
const previewImage = document.getElementById('preview-image'); // used to display provided image
const newImage = document.getElementById('new-image'); // used to display new image
const formResults = document.getElementById('image-action'); // takes input from dropdown to take suitable action
const selectedFile = document.getElementById('selected-file'); // displays the uploaded file's name

/* DESIGNING BANNER */

let currentIndex = 1; // used to track transformation to be applied
const numFilters = 5; // number of overall filters
const bannerImage = new MyImage(banner); // creates MyImage object

function autoFilter() {
    currentIndex = currentIndex % numFilters; // ensuring it stays in rnage 0-4
    /* SWITCH BLOCK */
    switch(currentIndex) { // takes the value in switch expression
        case 1:
            bannerImage.filterImage('grayscale(100%)'); // turn image into black and white
            break;
        case 2:
            bannerImage.transformImage('scaleY(-1'); // flip the image vertically
            break;
        case 3:
            bannerImage.filterImage('blur(1px)'); // blur the image
            break;
        case 4:
            bannerImage.transformImage('scaleX(-1'); // flip the image horizontally
            break;
        default:
            bannerImage.reset(); // remoe any filter or transformation
            break;
    }
    currentIndex += 1; // increment the index
}
setInterval(autoFilter, 3000); // automatically applies transformation to the image

/* REVEAL THE WHOLE WEBSITE */
imageInput.addEventListener('change', (event) => { // listens to image being uploaded
    const file = event.target.files[0]; // get the uploaded the file
    const element = document.querySelector('.display-image') // get the tag for displaying images
    /* TRY-CATCH BLOCK */
    try {
        if (file) { // if file was uploaded

        element.style.display = 'flex'; // rest of the website is visible now
        const reader = new FileReader(); // Reads the image
        selectedFile.textContent = file.name.split('.').slice(0,-1).join(" "); // gets the filename
        reader.onload = (e) => { // on file being loaded, images are displayed
            previewImage.src = e.target.result;
            newImage.src = e.target.result;
        };
        reader.readAsDataURL(file); 

    } else { // if the read file is invalid

        elements.style.display='none'; // rest of the website remains hidden
        previewImage.src = ''; // images are not assigned
        newImage.src = '';
        selectedFile.textContent = '';
        throw new error('Invalid File. Please try again with a JPG or PNG file.') // throw a comprehensible error
    }
}
    catch (error) {
        alert(error) // show the error to the user
    }
})

/* APPLIES CHANGES TO IMAGE */
formResults.addEventListener('change', (event) => { // listens to dropdown value being selected
    const imageModifier = event.target.value; 
    const newImage = new MyImage(previewImage); // creates MyImage object
    /* SWITCH BLOCK */
    switch (imageModifier) { // takes the value in switch expression
        case 'grayscale': 
            newImage.filterImage('grayscale(100%)') // turn image into black and white
            break;
        case 'blur':
            newImage.filterImage('blur(2px)') // blur the image
            break;
        case 'horizontal-flip':
            newImage.transformImage('scaleX(-1)') // flip the image horizontally
            break;
        case 'vertical-flip':
            newImage.transformImage('scaleY(-1)') // flip the image vertically
            break;
        default:
            newImage.reset() // reset the image
            break;
        }
    });