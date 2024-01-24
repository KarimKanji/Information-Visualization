


function readImg(image) {
    console.log(image);

    const img = image;

    image.onload = () => {
        console.log("Loaded");

        const canvas = document.querySelector('#canvas');
        const context = canvas.getContext("2d");

        //canvas.height = image.height;
        //canvas.width = image.width;

        context.drawImage(image, 0, 0);

        const imgData = context.getImageData(0, 0, canvas.width, canvas.height )

        console.log(imgData);
        console.log(imgData.data.slice(0, 99));
        const data = imgData.data.slice(0, 4*10);

        const colorData= [];

        for(let i = 0; i < data.length; i += 4 ){

            // const red = data[i];
            // const green = data[i + 1];
            // const blue = data[i + 2];
            // const alpha = data[i + 3];

            colorData.push({
                r: data[i],
                g: data[i+1],
                b: data[i+2],
                a: data[i+3]

            });

           // console.log(red + green + blue + alpha);
        }

        console.log(colorData);
        

        


       // console.log(colorData);
    }


}

readImg(document.querySelector('#orig-img'));