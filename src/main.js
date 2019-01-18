import './styles.css';
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Doctor } from './doctor.js';

$(document).ready(function () {
  $("#search").submit(function (event) {
    event.preventDefault();

    let searchTerm = $("#searchTerm").val();
    let name = $("#name").val();
    let doctor = new Doctor(searchTerm, name);
    let acceptsPatients = "No";
    $("#showDetails").text(`here are your results for ${doctor.searchTerm}`);

    $.ajax({
      url: doctor.url,
      type: 'Get',
      timeout: 1000,
      data: {
        format: 'json'
      },
      success: function (response) {
        $(".result").show();
        let resultsCount = response.data.length;
        if (resultsCount < 1) {
          $("#resultCount").text(`Your search returned 0 results.`);
          $("#table").hide();
        }
        else {
          $("table tr:gt(0)").remove();
          $("#table").show();
          $("#resultCount").text(`Your search returned ${resultsCount} results.`);
          for (let i = 0; i < resultsCount; i++) {
            $("#table").append(`<tr id=${i}></tr>`);
          }
          for (let i = 0; i < resultsCount; i++) {
            if (response.data[i].practices[0].accepts_new_patients == true) {
              acceptsPatients = "Yes";
            }
            $("#" + i).html(
              `<td>${response.data[i].profile.first_name}</td>
              <td>${response.data[i].profile.last_name}</td>
              <td>${response.data[i].practices[0].visit_address.street}, ${response.data[i].practices[0].visit_address.city}</td>
              <td> ${response.data[i].practices[0].phones[0].number}</td>
              <td>${response.data[i].practices[0].website}</td>
              <td> ${acceptsPatients}</td>`);
            acceptsPatients = "No";
          }
        }
      },
      error: function (xhr, status) {
        let errorMessage = "There was a problem with this request. Status: " + status + ', Error Message: ' + xhr.statusText;
        $('#errors').text(errorMessage);
      }
    });

  });

  $("#reset").click(function () {
    location.reload();
  });

});