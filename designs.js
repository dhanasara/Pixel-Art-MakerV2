// Constant variables
const tableId = "pixelCanvas";
const bgColor = "background-color";
const colorPicker = $("#colorPicker");

// Boolean flag variables
let applyColor = false;
let rightClick = false;

/**
* @description function to create table grid based on user inputs.
*/
function makeGrid() {
  // Select size input
  var rowNum = $("#inputHeight").val();
  var colNum = $("#inputWeight").val();

  // empty the table before creating new
  $("#" + tableId).empty();

  var table = document.getElementById(tableId);
  for (let i = 1; i <= rowNum; i++) {
    var row = document.createElement("tr");

    for (let k = 1; k <= colNum; k++) {
      var box = document.createElement("td");
      row.appendChild(box);
    }
    table.appendChild(row);
  }
}

/**
* @description call makeGrid(), When no.of rows and columns are submitted by user.
* @param {e} event - Form submission event.
*/
$("form").submit(function(e) {
  e.preventDefault();
  // disable the browser contextmenu for right mouse click.
  document.oncontextmenu = function() {
    return false;
  };
  makeGrid();
});

/**
* @description Function to coloring / de-coloring the Grid with the mouse events, holding the click and drag.
* @param {mousedown} mousedown - Mousedown event from Mouse click event.
* @param {td} td - table cell definition for coloring while clicking the cell.
*/
$("#" + tableId).on("mousedown", "td", function colorPixel(e) {
  // condition to check right mouse click
  if (e.button === 2) {
    rightClick = true;
    $(e.target).css(bgColor, "");
  } else {
    applyColor = true;
    $(e.target).css(bgColor, colorPicker.val());
  }
  $("td").mouseup(function() {
    if (rightClick) {
      $(this).css(bgColor, "");
      rightClick = false;
    } else if (applyColor) {
      $(this).css(bgColor, colorPicker.val());
      applyColor = false;
    }
  });
  $("td").mouseenter(function() {
    if (rightClick) {
      $(this).css(bgColor, "");
    }
    if (applyColor) {
      $(this).css(bgColor, colorPicker.val());
    }
  });
});

/**
* @description Function to Erase the selected color.
* @param {click} click - click event of the button Erase.
*/
$("#eraseColor").on("click", function() {
  colorPicker.val("#ffffff");
});
