console.log("hello")

const recordBtn = document.querySelector(".record-btn");

let  mediaRecorder
const result=document.getElementById("result")

if (navigator.mediaDevices.getUserMedia) {
    const constraints = { audio: true };
    navigator.mediaDevices.getUserMedia(constraints).then(
        stream => {
            console.log("授权成功！");
            mediaRecorder = new MediaRecorder(stream);
            recordBtn.onclick = () => {
                mediaRecorder.start();
                console.log("录音中...");
            };
            recordBtn.onclick = () => {
                if (mediaRecorder.state === "recording") {
                    mediaRecorder.stop();
                    recordBtn.textContent = "record";
                    console.log("录音结束");
                } else {
                    mediaRecorder.start();
                    console.log("录音中...");
                    recordBtn.textContent = "stop";
                }
                console.log("录音器状态：", mediaRecorder.state);
            };



            let chunks = [];
            mediaRecorder.ondataavailable = function(e) {
                chunks.push(e.data);
            };
            mediaRecorder.onstop = e => {
                var blob = new Blob(chunks, { type: "audio/ogg; codecs=opus" });
                chunks = [];
                var audioURL = window.URL.createObjectURL(blob);
                audio.src = audioURL;
            };
        },
        () => {
            console.error("授权失败！");
            result.context="授权失败"
        }
    );
} else {
    console.error("浏览器不支持 getUserMedia");
}



