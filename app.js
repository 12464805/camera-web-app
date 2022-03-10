var frontCamera=false;
var currentStream;


const
  cameraView=document.querySelector("#camera-view"),
  cameraDevice=document.querySelector("#camera-device"),
  photoDisplay=document.querySelector("#photo-display"),
  takePhotoButton=document.querySelector("#take-photo-button");
  frontCameraButton=document.querySelector("#front-camera-button");
  
frontCameraButton.onclcik=function(){
	frontCamera = !frontCamera;
	if(frontCamera){
		frontCameraButton.textContext="Back Camera";
	}else{
		frontCameraButton.textContext="Front Camera";
	}
	cameraStart();
	
	
}

function cameraStart(){
	if(typeof currentStream !== 'undefined'){
		currentStream.getTracks().forEach(track=>{track.stop();});
	}
	
	var constraints=(video:{facingMode? "user":"envirnment")}, audio:false)
	
	navigator.mediaDevices.getUserMedia(constraints)
	.then(function(stream){
		currentStream=stream;
		cameraDevice.srcObject=stream;
    }).catch(function(error){
		console.error("Error happened", error)
	})
}

takePhotoButton.onclick=function(){
	cameraView.width=cameraDevice.videoWidth;
	cameraView.height=cameraDevice.videoHeight;
	cameraView.getContent("2d").drawImage(cameraDevice,0,0);
	photoDisplay,scr=cameraView.toDataURL("image/webp");
	photoDisplay.classList.add("photo-taken");
}

window.addEventListener("load", cameraStart);
  