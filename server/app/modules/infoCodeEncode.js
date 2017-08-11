/**
 * priorità attributi
 * età: spot promozionale per adulti, non dovrebbe essere visto da bambini
 * sesso:
 * Etnia
 * Glasses
 * 
 * age
 * 1 0112
 * 2 1317
 * 3 1924
 * 4 2534
 * 5 3544
 * 6 4554
 * 7 5565
 * 8 6599
 * 9 All
 * 
 * 
 * codice: 0000     0       0         0
 * 		   età    sesso   etnia     occhiali
 * 
 * Codici: 0899 M A G
 */

class InfoCodeEncode {
	constructor(infoobj) {

		this.info = JSON.parse(infoobj);
		this.code = "";
	}
	setInfo(infoobj) {
		this.info = infoobj;
	}
	getTitle() {
		return this.info.title;
	}
	encodeAge() {
		var age = "";
		var agecases = {
			"0112": 1,
			"1317": 2,
			"2534": 3,
			"1924": 4,
			"3544": 5,
			"4554": 6,
			"5565": 7,
			"6599": 8,
			"A": 9
		};
		if (this.info.age == "all" || this.info.age.indexOf("all") != -1)
			age = "12345678";
		else {
			this.info.age.forEach(function (i) {
				age += agecases[i];
			}, this);
		}
		return age;
	}

	encodeGender() {
		var gender = (this.info.gender == "male") ? "M" : ((this.info.gender == "female") ? "F" : "A");
		return gender;
	}
	encodeGlasses() {
		var glasses = (this.info.glasses == "yes") ? "G" : ((this.info.glasses == "no") ? "E" : "A");
		return glasses;
	}


	encodeEthnicity() {
		var ethnicity = "";

		var ethnicitycases = {
			"white": "W",
			"hispanic": "H",
			"asian": "A",
			"black": "B",
			"other": "O",
			"all": "*"
		};
		if (this.info.ethnicity == "all" || this.info.ethnicity.indexOf("all") != -1)
			ethnicity = "12345678";
		else {
			this.info.ethnicity.forEach(function (i) {
				ethnicity += ethnicitycases[i];
			}, this);
		}
		return ethnicity;

	}
	getCode() {
		var code = this.encodeAge() + "-" + this.encodeGender() + "-" + this.encodeGlasses() + "-" + this.encodeEthnicity();
	
		return code;
	}

}

module.exports = InfoCodeEncode;