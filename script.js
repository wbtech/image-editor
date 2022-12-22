{
const fileInput = document.querySelector('#imageFileinput');
const canvas = document.querySelector('#canvas');
const canvasCtx = canvas.getContext('2d');
    
    // editors
const brightnessInput = document.querySelector('#brightness');
const saturationInput = document.querySelector('#saturation');
const blurInput = document.querySelector('#blur');
const inversionInput = document.querySelector('#inversion');
const contrastInput = document.querySelector('#contrast');
const grayscaleInput = document.querySelector('#grayscale');
const opacityInput = document.querySelector('#opacity');
const sepiaInput = document.querySelector('#sepia');

const settings = {};
let image = null;

//reset the values of the toolbar to default value
function resetSettings() {
    settings.brightness = '100';
    settings.saturation = '100';
    settings.blur = '0';
    settings.inversion = '0';
    settings.contrast = '100';
    settings.grayscale = '0';
    settings.opacity = '100';
    settings.sepia = '0';


    brightnessInput.value = settings.brightness;
    saturationInput.value = settings.saturation
    blurInput.value = settings.blur;
    inversionInput.value = settings.inversion;
    contrastInput.value = settings.contrast;
    grayscaleInput.value = settings.grayscale;
    opacityInput.value = settings.opacity;
    sepiaInput.value = settings.sepia;
}

function updateSettings(key, value) {
    if (!image) return;

    settings[key] = value;
    renderImage();
}

//to set the filter  of the toolbar
function generateFilter() {
    const { brightness, saturation, blur, inversion, contrast, grayscale, opacity, sepia } = settings;

    return `brightness(${brightness}%) saturate(${saturation}%)  blur(${blur}px) invert(${inversion}%) contrast(${contrast}%) grayscale(${grayscale}%) opacity(${opacity}%) sepia(${sepia}%)`;
}

function renderImage() {
    canvas.width = image.width;
    canvas.height = image.height;

    canvasCtx.filter = generateFilter();
    canvasCtx.drawImage(image, 0, 0);
}


brightnessInput.addEventListener('change', () => updateSettings('brightness', brightnessInput.value));
saturationInput.addEventListener('change', () => updateSettings('saturation', saturationInput.value));
blurInput.addEventListener('change', () => updateSettings('blur', blurInput.value));
inversionInput.addEventListener('change', () => updateSettings('inversion', inversionInput.value));
contrastInput.addEventListener('change', () => updateSettings('contrast', contrastInput.value));
grayscaleInput.addEventListener('change', () => updateSettings('grayscale', grayscaleInput.value));
opacityInput.addEventListener('change', () => updateSettings('opacity', opacityInput.value));
sepiaInput.addEventListener('change', () => updateSettings('sepia', sepiaInput.value));


fileInput.addEventListener('change', () => {
    image = new Image();

    image.addEventListener('load', () => {
        resetSettings();
        renderImage();
    });
    image.src = URL.createObjectURL(fileInput.files[0]);

})

//reset
resetSettings();
}
