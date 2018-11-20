function Cursor() {
    this.x = 0;
    this.y = random(height);

    this.update = function(beat) {
        this.x = map(beat, 0, 7, 0, width);
    }

    this.show = function() {
        rect(this.x, 0, 10, height);
    }
}
