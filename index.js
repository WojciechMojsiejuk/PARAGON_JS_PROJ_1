// Import stylesheets
import "./style.css";
//  localStorage.clear();
// Write Javascript code!

//Sprawdzenie czy przeglądarka obsługuje zapisywanie danych do local storage
function localStorageTest() {
  const test = "test" + new Date().valueOf();
  try {
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (e) {
    return false;
  }
}

class Receipt {
  constructor(records = []) {
    //onfocus old value
    let old_value;
    //methods

    this.total = function() {
      let total = 0;
      for (let i = 0; i < this.records.length; i++) {
        total += this.records[i].sum;
      }
      return Math.round(total*100)/100;
    };

    this.moveUp = function(event) {
      let index = -1;
      for (let i = 0; i < this.records.length; i++) {
        if (event.target == this.records[i].buttonUp) {
          index = i;
          break;
        }
      }
      console.log("Clicked button up index: " + index);
      //only if this row is not a first row
      if (index > 0) {
        let temp = this.records[index - 1];
        this.records[index - 1] = this.records[index];
        this.records[index] = temp;
        this.update();
      }
    };

    this.moveDown = function(event) {
      let index = -1;
      for (let i = 0; i < this.records.length; i++) {
        if (event.target == this.records[i].buttonDown) {
          index = i;
          break;
        }
      }
      console.log("Clicked button down index: " + index);
      if (index < this.records.length - 1) {
        let temp = this.records[index + 1];
        this.records[index + 1] = this.records[index];
        this.records[index] = temp;
        this.update();
      }
    };

    this.deleteRecord = function(event) {
      let index = -1;
      for (let i = 0; i < this.records.length; i++) {
        if (event.target == this.records[i].buttonClose) {
          index = i;
          break;
        }
      }
      if (confirm("Are you sure you want to delete this record?")) {
        console.log(index);
        this.records.splice(index, 1);
        this.update();
      }
    };

    this.addRecord = function(name, quantity, price) {
      this.records.push(new Record(name, quantity, price));
      this.update();
    };

    this.editField = function(record, field_name) {
      console.log("Edit field function called");
      if (confirm("Are you sure you want to edit this field?")) {
        console.log(event.target.innerText);
        switch (field_name) {
          case "name":
            if (validString(event.target.innerText, event.target)) {
              record.name = event.target.innerText;
            }
            break;
          case "quantity":
            let new_quantity = parseFloat(
              event.target.innerText.replace(",", ".")
            );
            if (validNumber(new_quantity, event.target)) {
              record.quantity = new_quantity;
            }
            break;
          case "price":
            let new_price = parseFloat(
              event.target.innerText.replace("zł", "")
            );

            if (validNumber(new_price, event.target)) {
              record.price = new_price;
            }
            break;
        }
      }
      this.update();
    };
    this.update = function() {
      //get <body>
      let parent = document.getElementById("ProductList");
      //Clear section
      parent.innerHTML = "";

      //Add section
      //loop through rows
      for (let i = 0; i < this.records.length; i++) {
        let row = parent.insertRow();

        //cells
        let cells = new Array();
        //loop through cells
        for (let j = 0; j < 6; j++) {
          cells.push(row.insertCell(j));
        }
        //set buttons on click option
        this.records[i].buttonUp.onclick = this.moveUp.bind(this);
        this.records[i].buttonDown.onclick = this.moveDown.bind(this);
        this.records[i].buttonClose.onclick = this.deleteRecord.bind(this);
        //set data
        cells[0].innerText = (i + 1).toString();
        cells[1].innerText = this.records[i].name;
        cells[1].setAttribute("contenteditable", "true");
        cells[1].addEventListener("focusout", event => {
          this.editField(this.records[i], 'name');
        });
        cells[2].innerText = this.records[i].quantity;
        cells[2].setAttribute("contenteditable", "true");
        cells[2].addEventListener("focusout", event =>
        {
          this.editField(this.records[i], "quantity");
        });
        cells[3].innerText = this.records[i].price + " zł";
        cells[3].setAttribute("contenteditable", "true");
        cells[3].addEventListener("focusout", event =>
        {
          this.editField(this.records[i], "price");
        });
        this.records[i].update_sum();
        cells[4].innerText = this.records[i].sum + " zł";

        let navigationButtons = document.createElement("div");
        navigationButtons.style.width = "50%";
        navigationButtons.style.cssFloat = "left";
        navigationButtons.appendChild(this.records[i].buttonUp);
        navigationButtons.appendChild(this.records[i].buttonDown);

        let deleteButton = document.createElement("div");
        deleteButton.style.width = "50%";
        deleteButton.style.cssFloat = "left";
        deleteButton.appendChild(this.records[i].buttonClose);

        let allButtons = document.createElement("div");
        allButtons.appendChild(navigationButtons);
        allButtons.appendChild(deleteButton);
        cells[5].style.backgroundColor = "rgb(255,255,255)";
        cells[5].style.width = "80px";

        cells[5].appendChild(allButtons);
      }
      let totalValue = this.total();
      this.totalMessage.innerHTML = totalValue.toString() + "zł";
      localStorage.records = JSON.stringify(this.records);
    };

    this.records = new Array();
    this.totalMessage = document.getElementsByClassName("razem")[1];

    if (records && records.length) {
      for (let i = 0; i < records.length; i++) {
        this.addRecord(records[i].name, records[i].quantity, records[i].price);
      }
    }
    this.update();
  }
}

class Record {
  constructor(name, quantity, price) {
    this.name = name;
    this.quantity = quantity;
    this.price = price;
    this.sum;
    // TODO: implement here
    this.update_sum();
    this.buttonClose = document.createElement("button");
    this.buttonClose.innerHTML = "&times";
    this.buttonUp = document.createElement("BUTTON");
    this.buttonUp.innerHTML = "↑";
    this.buttonDown = document.createElement("BUTTON");
    this.buttonDown.innerHTML = "↓";
  }
  set record_name(new_name) {
    this.name = new_name;
  }
  get record_name() {
    return this.name;
  }
  set record_quantity(new_quantity) {
    this.quantity = new_quantity;
  }
  get record_quantity() {
    return this.record_quantity;
  }
  set record_price(new_price) {
    this.price = new_price;
  }
  get record_price() {
    return this.price;
  }
  set record_position(new_position) {
    this.position = new_position;
  }
  get record_position() {
    return this.position;
  }
  update_sum() {
    this.sum = Math.round(this.quantity * this.price * 100)/100;
  }
  get record_sum() {
    return this.sum;
  }
}
class Form {
  constructor(receipt) {
    this.receipt = receipt;
    this.form_inputs = document.getElementsByTagName("input");
    this.record_obj_name = this.form_inputs[0];
    this.record_obj_quantity = this.form_inputs[1];
    this.record_obj_price = this.form_inputs[2];
    this.add_record_button = this.form_inputs[3];
    this.addRecord = function() {
      let name = this.record_obj_name.value;
      let quantity = parseFloat(
        this.record_obj_quantity.value.replace(",", ".")
      );
      let price = parseFloat(this.record_obj_price.value.replace(",", "."));
      //clear styles
      this.record_obj_name.style.backgroundColor = null;
      this.record_obj_quantity.style.backgroundColor = null;
      this.record_obj_price.style.backgroundColor = null;
      //validate data
      if (
        validString(name, this.record_obj_name) &&
        validNumber(quantity, this.record_obj_quantity) &&
        validNumber(price, this.record_obj_price)
      ) {
        //add record
        this.receipt.addRecord(name, quantity, price);
        //wyzerowanie pól formularza
        this.record_obj_name.value = "";
        this.record_obj_quantity.value = "";
        this.record_obj_price.value = "";

        //clear styles
        this.record_obj_name.style.backgroundColor = null;
        this.record_obj_quantity.style.backgroundColor = null;
        this.record_obj_price.style.backgroundColor = null;
      }
    };
    this.add_record_button.onclick = this.addRecord.bind(this);
  }
}

// Funkcja waliduje dane podane w formularzu
function validString(string, object) {
  console.log(string);
  console.log(string.length);
  console.log(object);
  let regex = new RegExp("/[\r\n]+/gm");
  string = string.replace(regex, "");
  console.log(string);
  console.log(string.length);
  if (string.length <= 0 || string == "") {
    alert("Name can not be empty");
    object.style.backgroundColor = "red";
    return false;
  }
  return true;
}

// Funkcja waliduje liczby zmiennoprzecinkowe w formularzu
function validNumber(number, object) {
  if (number == null) {
    alert("This field can not be empty ");
    object.style.backgroundColor = "red";
    return false;
  }
  if (isNaN(number)) {
    alert(number.toString() + " is not a number!");
    object.style.backgroundColor = "red";
    return false;
  }
  if (number <= 0) {
    alert(number.toString() + " is not a positive number");
    object.style.backgroundColor = "red";
    return false;
  }
  return true;
}
let receipt;
let form;
if (localStorageTest()) {
  if (localStorage.records == undefined) {
    receipt = new Receipt();
  } else {
    receipt = new Receipt(JSON.parse(localStorage.records));
  }

  form = new Form(receipt);
} else {
  alert("localStorage doesn't work, your changes won't be saved");
}
