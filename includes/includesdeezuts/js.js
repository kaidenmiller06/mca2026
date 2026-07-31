var audio_file = new Audio('AMONG US SUS SOUND EFFECT.mp3')
audio_file.addEventListener('timeupdate', function(){
    var buffer = .44
    if(this.currentTime > this.duration - buffer){
        this.currentTime = 0
        this.play()
    }
});