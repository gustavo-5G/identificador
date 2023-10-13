function setup() {
  canvas = createCanvas(300, 200);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  classifier= ml5.imageClassifier("mobileNet",modelLoaded)
}
function draw(){
  image(video,0,0,300,300)
  classifier.classify(video,gotResult)
}
function modelLoaded(){
console.log("modelo carregado")

}
var previousResult= ""
function gotResult(error,results){
if(error){
console.error(error)
}
else{
  if((results[0].confidance>0.5) && (previousResult!=results[0].label)){
    console.log(results)
    previousResult=results[0].label
    var synth=window.speechSynthesis
    speakData= "o objeto detectado é " + previousResult
    var utterThis= new SpeechSynthesisUtterance(speakData)
    synth.speak(utterThis)
    document.getElementById("resultObjectiveName").innerHTML= previousResult
    document.getElementById("resultObjectiveAccuracy").innerHTML= results[0].confidance.toFixed(1)
  }
}
}



