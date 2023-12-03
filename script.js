
const videoElement = document.getElementById('video');
const button = document.getElementById('button');

//Prompt to select media stream, pass to video element, then play

async function selectMediaStream(){
    try {
        const mediaStream = await navigator.mediaDevices.getDisplayMedia();
        videoElement.srcObject = mediaStream;
        videoElement.onloadedmetadata = () => {
            videoElement.play();
        }
    } catch(error){
        //Catch error here 
        console.log('Something went wrong', error)
    }
}

button.addEventListener('click', async() => {
    //disable button 
    button.disable = true;

    videoElement.addEventListener('loadedmetadata', async () => {
        try {
          await videoElement.requestPictureInPicture();
        } catch (error) {
          console.log('Failed to start picture-in-picture', error);
        } finally {
          // Reset button 
          button.disabled = false;
        }
      });
    
      // Call the selectMediaStream function
      await selectMediaStream();
  
})