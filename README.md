# Image-Filter

Link to the site: https://image-filter-bounty.web.app/  

## Introduction  

The repo contains files used for making and deploying the website to Firebase. The site takes an image as an input and then applies a filter/style to produce a new image. There are 4 filter options: blur, grayscale, horizontal-flip, and vertical-flip. Users have the option to decide the filter they wish to apply and also have the option to reset the image.  

## Use of classes  

I decided to treat every image as an object with several methods that, when called, would apply a filter. For that, I had to use DOM to get the tag of that image based on its ID or class name. I created a class called **MyImage** (I wanted to create my own Image class but the name was taken) with methods: reset, transform, and filter.  

The constructor would take an image tag as an input. The methods *transformImage* and *filterImage* act like CSS class attributes but as functions. They take the values for styling and then assign the *style* to the object object respectively. The method **reset** removes any effect by transformImage or filterImage.  
```js
// Demonstration of class
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
```
There are 2 objects of this class. One of them is the banner at the top of the site which has a filter applied every 3 seconds. The purpose of this is to give the visitors an idea of what they can expect from the site. The other object is a copy of the image uploaded by the user which changes based on applied style and the user can compare both the original and modified image side by side.  

The use of class allows us to change an image's state more conveniently as well as apply the same to any number of objects we create.  

## Use of try-catch  

I employed try-catch when I was coding a way to **try** to take the uploaded image from the HTML. In the HTML file, the input button has been designed to take an image only.  
```html
<input type="file" id="image-input" accept="image/*">
```
But, in case the provided image turns out to be invalid (maybe it's corrupted or it's actually not supposed to be an image), the code will **catch** that error and ask the user to provide a valid image.  
```js
// Demonstration of try-catch block
imageInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    const element = document.querySelector('.display-image')
    try {
        if (file) {
        ...
    } else {
        ...
        throw new error('Invalid File. Please try again with a JPG or PNG file.')
    }
}
    catch (error) {
        alert(error)
    }
});
```
## Use of switch  

The banner's filter or transform value changes every 3 seconds. There is a variable that has values 0 to 4 and the value is used in a **switch** expression which decides how the banner will look after every 3 seconds. For example, if the variable's value is 3, it will call the **filterImage** method with argument *blur(1px)* to blur the banner. Similarly, for value 4, it will call the **transformImage** with argument *scaleX(-1)* to horizontally flip the image. The switch case makes the code more readable compared to using lists or if-else statements.
```js
// Demonstration of switch
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
    };
```

We also use **switch** after a user uploads an image. The site has a dropdown menu with options: blur, grayscale, horizontal-flip, vertical-flip, and "none (reset)". Every time there is a *change* in the dropdown's value, the event listener in the Javascript file responds to that change with a callback function, which takes the event as the input. Using the event, we get the current value set.  

In the function, we have a switch block that takes the value from the event object. With respect to that value, the object calls the method and a modified image is displayed to the user.  

## Walkthrough  

Now that you know the science behind this website, are you ready to try it? To test this site, you can either [click here](https://image-filter-bounty.web.app/) or copy-paste this link https://image-filter-bounty.web.app in a browser's URL.

1. Upon opening the website, you will be greeted by a banner as well as a button that asks for an image.
2. Click on the button to upload the image.
3. You will see your image as well as a copy of your image side by side.
4. Below the images you will see a dropdown menu with "none (reset)" selected as the default value. You can click on the dropdown and select some other value to see a change in your image.  
5. Note: you can remove a filter by clicking on another value or clicking on "none (reset)".

And that is it! With the use of classes, switch, and try-catch, a website that gives your image a whole new look was born. Hope you enjoyed using this website and feel free to provide any feedback at claim.akshar@gmail.com.  

<img width="500" alt="image" src="https://github.com/AksharGoyal/Image-Filter/assets/38995624/ddd5590e-baee-4021-a77c-12c96938356d">

