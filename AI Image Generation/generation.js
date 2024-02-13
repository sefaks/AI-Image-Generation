const generateForm = document.querySelector(".generate-form");
const imageGallery = document.querySelector(".image-gallery");

const OPENAI_API_KEY="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";

const requestBody = {
    prompt: userPrompt,
    n: userImgQuantity,
    size: "512x512",
    response_format: "b64_json"
};
const updateImageCard = (imgDataArray) =>{
    imgDataArray.forEach((imgObject,index)=>{
        const imgCard = imageGallery.querySelectorAll(".img-card")[index];
        const imgElement = imgCard.querySelector("img");


        const aiGeneratedImg = `data:image/jpeg;base64,${imgObject.b64_json}`;
        imgElement.src = aiGeneratedImg;

        imgElement.onload = () => {
            imgCard.classList.remove("loading");
        }
    });
}

generateAiImages= async (userPrompt,userImgQuantity) => {
  

        const response = await fetch("https://api.openai.com/v1/images/generations",{
            method : "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${OPENAI_API_KEY}`
            }
            
            ,
        body: JSON.stringify({

            requestBody
        })

        })
    }



const handleFormSubmission=(e)=>{
    e.preventDefault();

    const userPrompt = e.srcElement[0].value;
    const userImgQuantity = e.srcElement[1].value;

    console.log(userPrompt,userImgQuantity);

    const imgCardMarkup = Array.from({ length: userImgQuantity }, () =>
    `<div class="img-card loading">
         <img src="loader.svg" alt="">
         <a href="#" class="download-btn">
             <img src="download.svg" alt="download-icon">
         </a>
     </div>`
 ).join("");
 
 imageGallery.innerHTML = imgCardMarkup;
 generateAiImages(userPrompt,userImgQuantity)
}
generateForm.addEventListener("submit",handleFormSubmission);