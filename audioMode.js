function AudioMode(num, volumes){
    this.num = num;
    this.numOfSettings = 3;
    this.audioModes = ['Practice', 'Sonify', 'Perform'];

    this.musicVol = volumes.musicVol;
    this.voice = volumes.voice;
    this.controlsVol = volumes.controlsVol;

    this.setDefaults = function() {
        this.musicVol.volume.value = -18;
        this.voice.setVolume(1);
        this.controlsVol.volume.value = 0;
    }

    this.getMode = function() {
        return this.audioModes[this.num];
    }

    this.changeSettingTo = function(num){
        this.num = mod(num, this.numOfSettings);
        this.setMode();
    }

    this.changeSettingRight = function() {
        this.num = mod(this.num += 1, this.numOfSettings);
        this.speakMode();
        this.setMode();
    }

    this.changeSettingLeft = function() {
        this.num = mod(this.num -= 1, this.numOfSettings);
        this.speakMode();
        this.setMode();
    }

    this.setMode = function() {
        switch(this.num) {
            case 0:
                this.setToPractice();
                break;
            case 1:
                this.setToSonify();
                break;
            case 2:
                this.setToPerform();
        }
    }

    this.setToPractice = function() {
        this.musicVol.volume.rampTo(-18, 1);
        this.voice.setVolume(1);
        this.controlsVol.volume.rampTo(0, 1);
    }

    this.setToSonify = function() {
        this.musicVol.volume.rampTo(-10, 1);
        this.voice.setVolume(1);
        this.controlsVol.volume.rampTo(0, 1);
    }

    this.setToPerform = function() {
        this.musicVol.volume.rampTo(0, 1);
        this.voice.setVolume(0);
        this.controlsVol.volume.rampTo(-30, 1);
    }

    this.speakMode = function() {
        this.voice.setVolume(1);
        this.voice.speak(this.getMode());
    }
}

function mod(n, m) {
  return ((n % m) + m) % m;
}
