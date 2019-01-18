import './styles.css';
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Doctor } from './doctor.js';

$(document).ready(function () {
  $("#search").submit(function (event) {
    event.preventDefault();
    $(".result").show();
    
    let searchTerm = $("#searchTerm").val();
    let name = $("#name").val();
    let doctor = new Doctor(searchTerm, name);

    $("#showDetails").text(`here are your results for ${doctor.searchTerm}`);
    
    $.ajax({
      url: doctor.url,
      type: 'Get',
      data: {
        format: 'json'
      },
      success: function (response) {
        for (let i = 0; i < response.data.length; i++) {
          $("#table").append(`<tr id=${i}></tr>`);
        }
        for (let i = 0; i < response.data.length; i++) {
          $("#"+i).html(
            `<td>${response.data[i].profile.first_name}</td>
            <td>${response.data[i].profile.last_name}</td>
            <td>${response.data[i].practices[0].visit_address.street}, ${response.data[i].practices[0].visit_address.city}</td>
            <td> ${response.data[i].practices[0].phones[0].number}</td>
            <td>${response.data[i].practices[0].website}</td>
            <td> ${response.data[i].practices[0].accepts_new_patients}</td>`);
        }
      },
      error: function () {
        $('#errors').text("There was an error processing your request. Please try again.");
      }
    });

  });



});