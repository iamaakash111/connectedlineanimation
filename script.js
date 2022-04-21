const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
const particles =[];
let hue = 0;

window.addEventListener("resize", function(){
    canvas.height = window.height;
    canvas.width = window.width;
})

const mouse = {
    x:undefined,
    y:undefined
}
canvas.addEventListener("mousemove", function(e){
    mouse.x = e.x;
    mouse.y = e.y;
    for (let i = 0; i<5; i++ ){
        particles.push(new Particle());
    }

})
canvas.addEventListener("touchmove", function(e){
    mouse.x = e.touches[0].screenX;
    mouse.y = e.touches[0].screenY;
    for (let i = 0; i<5; i++ ){
        particles.push(new Particle());
    }
    
})
canvas.addEventListener("click", function(e){
    mouse.x = e.x;
    mouse.y = e.y;
    for (let i = 0; i<10; i++ ){
        particles.push(new Particle());
    }

})

class Particle {
    constructor(){
        this.x = mouse.x;
        this.y = mouse.y;
        this.size = Math.random()*15 + 1;
        this.speedX = Math.random()*4 - 2; 
        this.speedY = Math.random()*4 - 2;
        this.color = `hsl(${hue},100%,50%)`; 
    }
    draw(){
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y,this.size,0, Math.PI * 2);
        ctx.fill();
    }
    update(){
        this.x+= this.speedX;
        this.y+= this.speedY; 
        if (this.size>0.2){
            this.size -= 0.2;
        }    
    }

}
function animate() {
    ctx.clearRect(0,0, canvas.width,canvas.height);
    
    for (let i= 0; i<particles.length;i++){
        particles[i].update();
        particles[i].draw();
        
        for (let j=i; j<particles.length;j++){
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx*dx + dy*dy);
            if (dist<100){
                ctx.beginPath();
                ctx.strokeStyle = "white";
                ctx.lineWidth = 1;
                ctx.moveTo(particles[i].x,particles[i].y)
                ctx.lineTo(particles[j].x,particles[j].y)
                ctx.stroke();
            }
        }
        if (particles[i].size<0.2){
            particles.splice(i,1);
            i--;
        }
    }

    ctx.fillStyle="white"
    ctx.lineWidth =1;
    ctx.font = "25px arial";
    ctx.fillText("Hello, I'm Aakash",(canvas.width/2)-100,canvas.height/10);
    ctx.fill();
    ctx.fillStyle="white"
    ctx.lineWidth =1;
    ctx.font = "25px arial";
    ctx.fillText("Click/Move Mouse",(canvas.width/2)-100,canvas.height-25);
    ctx.fill();
    hue++;
    requestAnimationFrame(animate);
}

animate();