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
      let parent = document.getElementById("ProductList");
      for(let i=0;i<this.records.length;i++)
      {
        let row = parent.insertRow();
        for(let j=0;j<5;j++)
        {
          let cell = row.insertCell(j);
          cell.innerText = "TEST"
          //console.log(cell.innerText);
        }
        // let row = document.createElement('tr');
        // row.innerText = records[i].name;
        // parent.insertBefore(null, row);
      }
    }
    this.addRecord = function(name, quantity, price)
    {
      this.records.push(new Record(name, quantity, price));
      this.update();
    }
  }
  total()
  {
    let total = 0;
    for(let record in this.records)
    {
      total += record.price
    }
    return total
  }
}

class Record
{
    constructor(name, quantity, price, receipt_size)
  {
    this.name = name;
    this.quantity = quantity;
    this.price = price;
    this.sum;
    // TODO: implement here
    this.position = receipt_size+1;
    update_sum()
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
      object.style.backgroundColor = "red";
      alert("Invalid " + string.toString())
      return false;
    }
    return true;
  }

  // Funkcja waliduje liczby zmiennoprzecinkowe w formularzu
  function validNumber(number, object)
  {
    if(isNaN(number))
    {
      object.style.backgroundColor = "red";
      alert( number.toString() + " is not a number!")
      return false;
    }
    if(number == null)
    {
      object.style.backgroundColor = "red";
      alert("Empty " + number.toString() + " field")
      return false;
    }
    if(number < 0)
    {
      object.style.backgroundColor = "red";
      alert(number.toString()+" must be a positive number")
      return false;
    }
    return true;
 }

let receipt;
let form;
if(localStorageTest())
{
  
  if(localStorage.records == undefined)
  {
    receipt = new Receipt();
  }
  else
  {
    receipt = new Receipt(JSON.parse(localStorage.records))
  }
  
  form = new Form(receipt);
}
else
{
  alert("localStorage doesn't work your changes won't be saved")
}

// if (confirm('Are you sure you want to save this thing into the database?')){
//     // Save it!
// } else {
//     // Do nothing!
// }



/*
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
  constructor(records=[])
  {
    this.records = records;
    this.addRecord = function(name, quantity, price)
    {
      this.records.push(new Record(name, quantity, price));
    }
  }
  total()
  {
    let total = 0;
    for(let record in this.records)
    {
      total += record.price
    }
    return total
  }
}

class Record
{
  constructor(name, quantity, price, receipt_size)
  {
    this.name = name;
    this.quantity = quantity;
    this.price = price;
    this.sum;
    // TODO: implement here
    this.position = receipt_size+1;
    update_sum()
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
}

  // Funkcja waliduje dane podane w formularzu
  function validString(string, object)
  {
    
    if(string.length <= 0 )
    {
      object.style.backgroundColor = "red";
      alert("Invalid " + string.toString())
      return false;
    }
    return true;
  }

  // Funkcja waliduje liczby zmiennoprzecinkowe w formularzu
  function validNumber(number, object)
  {
    if(isNaN(number))
    {
      object.style.backgroundColor = "red";
      alert( number.toString() + " is not a number!")
      return false;
    }
    if(number == null)
    {
      object.style.backgroundColor = "red";
      alert("Empty " + number.toString() + " field")
      return false;
    }
    if(number < 0)
    {
      object.style.backgroundColor = "red";
      alert(number.toString()+" must be a positive number")
      return false;
    }
    return true;
 }

let receipt;
let form;
if(localStorageTest())
{
  
  if(localStorage.records == undefined)
  {
    receipt = new Receipt();
  }
  else
  {
    receipt = new Receipt(JSON.parse(localStorage.records))
  }
  
  form = new Form(receipt);
}
else
{
  alert("localStorage doesn't work your changes won't be saved")
}

// if (confirm('Are you sure you want to save this thing into the database?')){
//     // Save it!
// } else {
//     // Do nothing!
// }



*/