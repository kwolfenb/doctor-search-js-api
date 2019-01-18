import './styles.css';
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Doctor } from './doctor.js';



$(document).ready(function() {
  $("#search").submit(function(event) {
    event.preventDefault();
    let searchTerm = $("#searchTerm").val();
    let name = $("#name").val();
    let doctor = new Doctor(searchTerm, name);
    console.log(doctor.url);
    $.ajax({
      url: doctor.url,
      type: 'Get',
      data: {
        format: 'json'
      },
      success: function(response) {
        $("#showDetails").text(`here are your results for ${searchTerm}`);
        $("#description").text(`${response.data.practices.name}`);
      }, 
      error: function() {
        $('#errors').text("There was an error processing your request. Please try again.");
      }
    });
  });
  

});