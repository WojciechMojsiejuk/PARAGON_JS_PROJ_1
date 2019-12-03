// Import stylesheets
import './style.css';

// Write Javascript code!

//Sprawdzenie czy przeglądarka obsługuje zapisywanie danych do local storage
function localStorageTest(){
    const test = "test" + new Date().valueOf();
    try {
        localStorage.setItem(test, test);
        localStorage.removeItem(test);
        return true;
    } catch(e) {
        return false;
    }
}

class Receipt
{
  constructor()
  {
    this.records = new Array();
    this.update = function()
    {
      //get <body>
      let parent = document.getElementById("ProductList");
      //Clear section
      parent.innerHTML = "";

      //Add section
      //loop through rows
      for(let i=0;i<this.records.length;i++)
      {
        let row = parent.insertRow();
        //create up and down buttons
        // let buttonUp = document.createElement("BUTTON");
        // buttonUp.innerHTML = "↑";
        // buttonUp.onClick = this.moveUp;
        // let buttonDown = document.createElement("BUTTON");
        // buttonDown.innerHTML = "↓";
        parent.appendChild(this.records[i].buttonUp);
        parent.appendChild(this.records[i].buttonDown);
        //cells
        let cells = new Array();
        //loop through cells
        for(let j=0;j<5;j++)
        {
          cells.push(row.insertCell(j));
        }
        //set buttons on click option
        this.records[i].buttonUp.onclick = this.moveUp.bind(this);
        this.records[i].buttonDown.onclick = this.moveDown.bind(this);
        //set data
        cells[0].innerText = (i+1).toString();
        cells[1].innerText = this.records[i].name;
        cells[2].innerText = this.records[i].quantity;
        cells[3].innerText = this.records[i].price;
        cells[4].innerText = "Not calculated";
      }
    }
    this.addRecord = function(name, quantity, price)
    {
      this.records.push(new Record(name, quantity, price));
      this.update();
    }
    this.moveUp = function(event)
    {
      let index = -1;
      for(let i=0;i<this.records.length;i++)
      {
        if(event.target == this.records[i].buttonUp)
        {
          index = i;
          break;
        }
      }
      console.log("Clicked button up index: " + index);
      //only if this row is not a first row
      if(index > 0)
      {
        let temp = this.records[index - 1];
        this.records[index - 1] = this.records[index];
        this.records[index] = temp;
        this.update();
      }
    }
    this.moveDown = function(event)
    {
      let index = -1;
      for(let i=0;i<this.records.length;i++)
      {
        if(event.target == this.records[i].buttonDown)
        {
          index = i;
          break;
        }
      }
      console.log("Clicked button down index: " + index);
      if(index < this.records.length - 1)
      {
        let temp = this.records[index + 1];
        this.records[index + 1] = this.records[index];
        this.records[index] = temp;
        this.update();
      }
    }
  }
}

class Record
{
    constructor(name, quantity, price)
  {
    this.name = name;
    this.quantity = quantity;
    this.price = price;
    this.sum;
    // TODO: implement here
    this.update_sum()
    this.buttonUp = document.createElement("BUTTON");
    this.buttonUp.innerHTML = "↑";
    this.buttonDown = document.createElement("BUTTON");
    this.buttonDown.innerHTML = "↓";
  }
  set record_name(new_name)
  {
    this.name = new_name;
  }
  get record_name()
  {
    return this.name;
  }
  set record_quantity(new_quantity)
  {
    this.quantity = new_quantity;
  }
  get record_quantity()
  {
    return this.record_quantity
  }
  set record_price(new_price)
  {
    this.price = new_price
  }
  get record_price()
  {
    return this.price
  }
  set record_position(new_position)
  {
    this.position = new_position
  }
  get record_position()
  {
    return this.position
  }
  update_sum()
  {
    this.sum = Math.round(this.quantity*this.price, 2)
  }
}
class Form
{
  constructor(receipt)
  {
    this.receipt = receipt;
    this.form_inputs = document.getElementsByTagName("input");
    this.record_obj_name = this.form_inputs[0];
    this.record_obj_quantity = this.form_inputs[1];
    this.record_obj_price = this.form_inputs[2];
    this.add_record_button = this.form_inputs[3];
    this.addRecord = function()
    {
      let name = this.record_obj_name.value;
      let quantity = parseFloat(this.record_obj_quantity.value.replace(',','.'));
      let price = parseFloat(this.record_obj_price.value.replace(',', '.'));
      //clear styles
      this.record_obj_name.style.backgroundColor = null;
      this.record_obj_quantity.style.backgroundColor = null;
      this.record_obj_price.style.backgroundColor = null;
      //validate data
      if(validString(name, this.record_obj_name) && validNumber(quantity, this.record_obj_quantity) && validNumber(price, this.record_obj_price))
      {
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
    }
    this.add_record_button.onclick = this.addRecord.bind(this);
  }

  // Metoda pobiera pola formularza, waliduje je i jeżeli dane są prawidłowe, dodaje je do struktury paragonu 
  /*addRecord()
  {
    // Pobranie elementów

    let name = this.record_obj_name.value;
    let quantity = this.record_obj_quantity.value;
    quantity = parseFloat(quantity.replace(',', '.'));
    let price = this.record_obj_price.value;
    price = parseFloat(price.replace(',', '.'));

    // Czyszczenie styli

    name.style.backgroundColor = null;
    quantity.style.backgroundColor = null;
    price.style.backgroundColor = null;
    
    // Jeżeli dane są prawidłowe, dodaj je do paragonu

    if(validString(name, this.record_obj_name) && validNumber(quantity,this.record_obj_quantity) && validNumber(price, this.record_obj_price))
    {
      let record = new Record(name,quantity,price);
      
      // Wyzerowanie pól formularza

      this.record_obj_name.value = "";
      this.record_obj_quantity.value = "";
      this.record_obj_price.value = "";

      // Czyszczenie styli

      this.record_obj_name.style.backgroundColor = null;
      this.record_obj_quantity.style.backgroundColor = null;
      this.record_obj_price.style.backgroundColor = null;

    }
  }*/
}

  // Funkcja waliduje dane podane w formularzu
  function validString(string, object)
  {
    
    if(string.length <= 0 )
    {
      alert("Invalid " + string.toString())
      object.style.backgroundColor = "red";
      return false;
    }
    return true;
  }

  // Funkcja waliduje liczby zmiennoprzecinkowe w formularzu
  function validNumber(number, object)
  {
    if(isNaN(number))
    {
      alert( number.toString() + " is not a number!")
      object.style.backgroundColor = "red";
      return false;
    }
    if(number == null)
    {
      alert("Empty " + number.toString() + " field")
      object.style.backgroundColor = "red";
      return false;
    }
    if(number <= 0)
    {
      alert(number.toString()+" must be a positive number")
      object.style.backgroundColor = "red";
      return false;
    }
    return true;
 }
let receipt = new Receipt()
let Form = new Form(receipt);
