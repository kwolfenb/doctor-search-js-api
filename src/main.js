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

    let promise = doctor.searchFunction();
    promise.then(function (response) {
      $(".result").show();
      let body = JSON.parse(response);
      let resultsCount = body.data.length;
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
          if (body.data[i].practices[0].accepts_new_patients == true) {
            acceptsPatients = "Yes";
          }
          $("#" + i).html(
            `<td>${body.data[i].profile.first_name}</td>
              <td>${body.data[i].profile.last_name}</td>
              <td>${body.data[i].practices[0].visit_address.street}, ${body.data[i].practices[0].visit_address.city}</td>
              <td> ${body.data[i].practices[0].phones[0].number}</td>
              <td><a href="${body.data[i].practices[0].website}">${body.data[i].practices[0].website}</a></td>
              <td> ${acceptsPatients}</td>`);
          acceptsPatients = "No";
        }
      }
    }, function (err) {
      $('#errors').text(`There was an error processing your request: ${err.message}`);
    });

    $("#reset").click(function () {
      location.reload();
    });

  });

});