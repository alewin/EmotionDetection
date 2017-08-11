/*


this.encodeAge() + "-" + this.encodeGender() + "-" + this.encodeGlasses() + "-" + this.encodeEthnicity();

*/
class InfoCodeDecode {
    constructor(code) {
        this.code = code.split("-");

    }

    decodeAge() {
        var age = [];
        var encodedAge = this.code[0];
        var agecases = {
            1: "0112",
            2: "1317",
            3: "2534",
            4: "1924",
            5: "3544",
            6: "4554",
            7: "5565",
            8: "6599",
            9: "*"
        };

        if (encodedAge == "9" || encodedAge.indexOf("9") != -1) {
            for (var i = 1; i < 9; i++) {
                age.push(agecases[i]);
            }
        } else {
            for (var i = 0; i < encodedAge.length; i++) {
                age.push(agecases[encodedAge[i]]);
            }

        }

        return age;
    }

    decodeGender() {
        var encodedGender = this.code[1];
        var gender = [];
        gender.push((encodedGender == "M") ? "male" : ((encodedGender == "F") ? "female" : "all"));
        return gender;
    }
    decodeGlasses() {
        var encodedGlasses = this.code[2];
        var glasses = [];
        glasses.push((encodedGlasses == "G") ? "yes" : ((encodedGlasses == "E") ? "no" : "all"));
        return glasses;
    }


    decodeEthnicity() {

        var ethnicity = [];
        var encodedEthnicity = this.code[3];
        var ethnicitycases = {
            "W": "white",
            "H": "hispanic",
            "A": "asian", 
            "B": "black", 
            "O": "other", 
            "*": "all"  
          };

        if (encodedEthnicity == "*" || encodedEthnicity.indexOf("*") != -1) {
            delete ethnicitycases["*"];
            for(i in ethnicitycases)
                ethnicity.push(i);
            
        } else {
            for (var i = 0; i < encodedEthnicity.length; i++) {
                ethnicity.push(ethnicitycases[encodedEthnicity[i]]);
            }

        }
        return ethnicity;

    }
    getInfo() {
        var info = {
            age: this.decodeAge(),
            gender: this.decodeGender(),
            glasses: this.decodeGlasses(),
            ethnicity: this.decodeEthnicity()
        };
        return info;
    }

}

module.exports = InfoCodeDecode;