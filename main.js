song1 = "";
objects = [];




function setup(){
canvas = createCanvas(640 , 420);
canvas.center();

video = createCapture(VIDEO);
video.size(640 , 420);
video.hide();
objectDetector = ml5.objectDetector('cocossd' , modelLoaded)
document.getElementById("status").innerHTML = "Status : Detecting Objects";
objectDetector.detect(video , gotResults);
}

function draw(){
image(video , 0 , 0 , 640 , 420);
if(status != ""){
r = random(255);
g = random(255);
b = random(255);
objectDetector.detect(video , gotResults);


for(i = 0; i<objects.length; i++){
fill(r , g , b);
percent = floor(objects[i].confidence * 100);
text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
noFill();
stroke(r , g , b);
rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
if(objects[i].label == "person"){
        document.getElementById("baby_status").innerHTML = "Baby Found";
        document.getElementById("status").innerHTML = "Status : Objects Detected";
        song1.stop();
       
        }
        
else{
        document.getElementById("baby_status").innerHTML = "Baby not Found";
        document.getElementById("status").innerHTML = "Status : Objects Detected";
        song1.play();
        }

if(objects.length = 0){
    document.getElementById("baby_status").innerHTML = "Baby not Found";
    document.getElementById("status").innerHTML = "Status : Objects Detected";
    song1.play();
    }
    
}     
}
}

function gotResults(error , results){
if(error){
console.log(error)
}
else{
console.log(results);
objects = results;
}
}

function modelLoaded(){
console.log("model is Loaded")
status = true;
}