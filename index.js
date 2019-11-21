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
    
    
  }


  
}

class Record
{
  constructor(name, quantity, price)
  {
    this.name = name;
    this.quantity = quantity;
    this.price = price;
  }

}

class Form
{
  constructor()
  {
    this.form_inputs = document.getElementsByTagName("input");
    this.record_obj_name = this.form_inputs[0];
    this.record_obj_quantity = this.form_inputs[1];
    this.record_obj_price = this.form_inputs[2];
    this.add_record_button = this.form_inputs[3];
    this.add_record_button.onclick = this.addRecord.bind(this);

  }
  // Metoda pobiera pola formularza, waliduje je i jeżeli dane są prawidłowe, dodaje je do struktury paragonu 

  addRecord()
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

    if(this.validForm(name, quantity, price))
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
  }

  // Metoda waliduje dane podane w formularzu
  validForm(name, quantity, price)
  {
    
    if(name.length <= 0 )
    {
      alert("Invalid name")
      this.record_obj_name.style.backgroundColor = "red";
      return false;
    }

    if(!validateNumber(quantity, this.record_obj_quantity))
    {
      return false;
    }
    
    if(!validateNumber(price, this.record_obj_price))
    {
      return false;
    }
    return true
  }

  // Metoda waliduje liczby zmiennoprzecinkowe w formularzu
  validateNumber(number, object)
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
    if(number < 0)
    {
      alert(number.toString()+" must be a positive number")
      object.style.backgroundColor = "red";
      return false;
    }
    return true;
  }
}
let receipt = new Receipt()
