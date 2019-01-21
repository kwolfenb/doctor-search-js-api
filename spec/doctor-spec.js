import { Doctor } from '../src/doctor.js';
describe('Doctor', function() {


  it('should create doctor with correct name search term', function() {
    let doctorName = "Jones";
    let search = "headache";
    let newDoctor = new Doctor (search, doctorName);
    expect(newDoctor.name).toEqual(doctorName);
    expect(newDoctor.searchTerm).toEqual(search);

  });
  
  it('should create doctor with correct name search term', function() {
    let doctorName = "Jones";
    let search = "headache";
    let newDoctor = new Doctor (search, doctorName);
    expect(newDoctor.name).toEqual(doctorName);
    expect(newDoctor.searchTerm).toEqual(search);

  });
  

});