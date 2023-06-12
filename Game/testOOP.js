class Stopwatch {

    duration;
    
    constructor(startTime, endTime, running){
        this.startTime = startTime;
        this.endTime = endTime;
        this.running = running;
    }
    start = function() {
        if (running) {
            throw new Error("stopwatch has already started");
        }
        running = true;
        startTime = new Date();
    };

    stop = function() {
        if(!running){
            throw new Error("stopwatch has not started");
        }
        running = false;
        endTime = new Date();

        const seconds = (endTime.getTime() - startTime.getTime()) / 1000;
        duration += seconds;
    };

    reset = function() {
        startTime = null;
        endTime = null;
        running = false;
        duration = 0;
    };


    get duration(){
        return this.duration();
    }
    
}

const fastestLap = new Stopwatch(0,12309,true,)
console.log(fastestLap.duration)