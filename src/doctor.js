export class Doctor {

  constructor(searchTerm, name) {
    this.name = name;
    this.searchTerm = searchTerm;
    this.apiKey = process.env.exports.apiKey;

    this.url = `https://api.betterdoctor.com/2016-03-01/doctors?name=${name}&query=${searchTerm}&location=37.773%2C-122.413%2C100&user_location=37.773%2C-122.413&skip=0&limit=10&user_key=${this.apiKey}`;

  }


}






