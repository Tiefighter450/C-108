Webcam.set({
    width: 397,
    height: 208,
    dest_width: 447,
    dest_height: 228,
    image_format: "png",
    png_quality: 90
});

camera = document.getElementById("camera");

Webcam.attach(camera);

function takeSnapshot() {
    Webcam.snap(function(data_uri) {
        document.getElementById("result").innerHTML = '<img id="capturedImg" src="' + data_uri + '"/>';
    })
}

console.log('ml5 version:', ml5.version);

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/0R5nWH5Aw/model.json", modelLoaded);

function modelLoaded() {
    console.log("Model Loaded!");
}

function check() {
    img = document.getElementById("capturedImg");
    classifier.classify(img, gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        document.getElementById("resultEmotionName").innerHTML = results[0].label;
        document.getElementById("resultEmotionName2").innerHTML = results[1].label;
        prediction1 = results[0].label;
        prediction2 = results[1].label;
        speak();

        if(results[0].label == "happy") {
            document.getElementById("updateEmoji").innerHTML = "&#128512;";
        }
        if(results[0].label == "sad") {
            document.getElementById("updateEmoji").innerHTML = "&#128549;";
        }
        if(results[0].label == "angry") {
            document.getElementById("updateEmoji").innerHTML = "&#128545;";
        }
        if(results[0].label == "surprised") {
            document.getElementById("updateEmoji").innerHTML = "&#128562;";
        }
        if(results[0].label == "confused") {
            document.getElementById("updateEmoji").innerHTML = "&#128533;";
        }
        if(results[0].label == "fearful") {
            document.getElementById("updateEmoji").innerHTML = "&#128552;";
        }

        if(results[1].label == "happy") {
            document.getElementById("updateEmoji2").innerHTML = "&#128512;";
        }
        if(results[1].label == "sad") {
            document.getElementById("updateEmoji2").innerHTML = "&#128549;";
        }
        if(results[1].label == "angry") {
            document.getElementById("updateEmoji2").innerHTML = "&#128545;";
        }
        if(results[1].label == "surprised") {
            document.getElementById("updateEmoji2").innerHTML = "&#128562;";
        }
        if(results[1].label == "confused") {
            document.getElementById("updateEmoji2").innerHTML = "&#128533;";
        }
        if(results[1].label == "fearful") {
            document.getElementById("updateEmoji2").innerHTML = "&#128552;";
        }
    }
}

function speak() {
    var synth = window.speechSynthesis;
    speakData1 = "The first prediction is " + prediction1 + ", ";
    speakData2 = "and the second prediction is " + prediction2 + ".";
    var utterThis = new SpeechSynthesisUtterance(speakData1 + speakData2);
    synth.speak(utterThis);
}