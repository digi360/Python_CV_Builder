$(document).ready(function () {

  console.log("document ready...");

  loadFromLocalStorage();
  $("#success").hide();

  $("#view_button").click(function (event)
  {
    $.post("/viewPDF", $("#cvBuilder").serialize()).done(function (data)
    {
      console.log("View PDF clicked... data type = " + type(data));
      // console.log("Posting form data: ", data);
    });
  });

  $("#download_button").click(function (event)
  {
    $.post("/downloadPDF", $("#cvBuilder").serialize()).done(function (data)
    {
      console.log("Download PDF clicked... data = " + type(data));
      // console.log("Posting form data: ", data);
    });
  });

  $("#save_button").click(function (event) {
    saveToLocalStorage();
  });
});

function printPDF(data)
{
  let docDefinition = data.dd;

  try
  {
    // open the PDF in a new window {pop-up blocker blocks this if enabled, but the user can add an exception}
    pdfMake.createPdf(docDefinition).open(); 
  }
  catch (ex)
  {
    console.log("Failed to open PDF in new window: " + ex);

    // download the PDF
    pdfMake.createPdf(docDefinition).download(data.cvname);
    console.log("Downloaded \"" + data.cvname + "\" to downloads folder.");
  }

  // // print the PDF
  // pdfMake.createPdf(docDefinition).print();

}

function loadFromLocalStorage() {
  let json = JSON.parse(localStorage.getItem('cv'));
  if (json != null)
  {
    $("#names").val(json["names"]);
    $("#dob").val(json["dob"]);
    $("#email").val(json["email"]);
    $("#phoneNumber").val(json["phoneNumber"]);
    $("#bio").val(json["bio"]);
    $("#nameOfQualification").val(json["nameOfQualification"]);
    $("#nameOfInstitution").val(json["nameOfInstitution"]);
    $("#studyDuration").val(json["studyDuration"]);
    $("#jobTitle").val(json["jobTitle"]);
    $("#nameOfCompany").val(json["companyName"]);
    $("#workDuration").val(json["workDuration"]);
    $("#jobDescription").val(json["jobDescription"]);
    $("#skills1").val(json["skills1"]);
    $("#skills2").val(json["skills2"]);
    $("#skills3").val(json["skills3"]);
    $("#skills4").val(json["skills4"]);
    $("#skills5").val(json["skills5"]);
  }
}

function saveToLocalStorage() {
  var json = {
    names: $("#names").val(),
    dob: $("#dob").val(),
    email: $("#email").val(),
    phoneNumber: $("#phoneNumber").val(),
    bio: $("#bio").val(),
    nameOfQualification: $("#nameOfQualification").val(),
    nameOfInstitution: $("#nameOfInstitution").val(),
    studyDuration: $("#studyDuration").val(),
    jobTitle: $("#jobTitle").val(),
    companyName: $("#nameOfCompany").val(),
    workDuration: $("#workDuration").val(),
    jobDescription: $("#jobDescription").val(),
    skills1: $("#skills1").val(),
    skills2: $("#skills2").val(),
    skills3: $("#skills3").val(),
    skills4: $("#skills4").val(),
    skills5: $("#skills5").val()
  };
  localStorage.clear();
  localStorage.setItem('cv', JSON.stringify(json));
}