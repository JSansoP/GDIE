class cue {
    constructor(id, inici, final, info) {
        this.id = id;
        this.inici = inici;
        this.final = final;
        this.info = info;
    }

    setTempsFinal(final) {
        this.final = final;
    }

    toVttFormat() {
        if (this.id == null || this.inici == null || this.final == null || this.info == null) return "";
        let cue = "id\n " + this.toHHMMSSttt(this.inici) + " -> " + this.toHHMMSSttt(this.final) + "\n" + this.info;
        return cue;
    }

    toHHMMSSttt(sec_num) {
        var hours = Math.floor(sec_num / 3600);
        var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
        var seconds = Math.floor(sec_num - (hours * 3600) - (minutes * 60));
        var miliseconds = Math.floor((sec_num - (hours * 3600) - (minutes * 60) - seconds) * 1000);

        if (hours < 10) { hours = "0" + hours; }
        if (minutes < 10) { minutes = "0" + minutes; }
        if (seconds < 10) { seconds = "0" + seconds; }
        if (miliseconds < 10) { miliseconds = "00" + miliseconds; }
        else if (miliseconds < 10) { miliseconds = "0" + miliseconds; }

        return hours + ':' + minutes + ':' + seconds + ':' + miliseconds;
    }
}
