const imageInput = document.getElementById("imageInput")

const originalCanvas = document.getElementById("originalCanvas")
const encryptedCanvas = document.getElementById("encryptedCanvas")

const ctx1 = originalCanvas.getContext("2d")
const ctx2 = encryptedCanvas.getContext("2d")

let currentKey = null

function log(msg){

const logs = document.getElementById("logs")

logs.innerHTML += msg + "<br>"

logs.scrollTop = logs.scrollHeight

}

imageInput.addEventListener("change",function(){

const file=this.files[0]

const img=new Image()

img.onload=function(){

originalCanvas.width=img.width
originalCanvas.height=img.height

encryptedCanvas.width=img.width
encryptedCanvas.height=img.height

ctx1.drawImage(img,0,0)

log("Image loaded")

}

img.src=URL.createObjectURL(file)

})

function generateKey(){

currentKey=Math.floor(Math.random()*200)+20

document.getElementById("keyInput").value=currentKey

log("Key generated: "+currentKey)

}

function encryptImage(){

generateKey()

let progress=document.getElementById("progress")

let p=0

let interval=setInterval(()=>{

p+=10

progress.style.width=p+"%"

if(p>=100){

clearInterval(interval)

runEncrypt()

}

},80)

}

function runEncrypt(){

let imgData=ctx1.getImageData(0,0,originalCanvas.width,originalCanvas.height)

let data=imgData.data

for(let i=0;i<data.length;i+=4){

data[i]^=currentKey
data[i+1]^=currentKey
data[i+2]^=currentKey

}

ctx2.putImageData(imgData,0,0)

log("Encryption completed")

}

function decryptImage(){

let key=parseInt(document.getElementById("keyInput").value)

if(isNaN(key)){

log("Enter correct key")

return

}

let imgData=ctx2.getImageData(0,0,encryptedCanvas.width,encryptedCanvas.height)

let data=imgData.data

for(let i=0;i<data.length;i+=4){

data[i]^=key
data[i+1]^=key
data[i+2]^=key

}

ctx2.putImageData(imgData,0,0)

log("Decryption completed")

}

function downloadImage(){

const link=document.createElement("a")

link.download="encrypted_image.png"

link.href=encryptedCanvas.toDataURL()

link.click()

log("Image downloaded")

}