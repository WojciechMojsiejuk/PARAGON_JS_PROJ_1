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
    this.form_inputs = document.getElementsByTagName("input");
    this.record_obj_name = this.form_inputs[0];
    this.record_obj_quantity = this.form_inputs[1];
    this.record_obj_price = this.form_inputs[2];
    this.add_record_button = this.form_inputs[3];
    this.add_record_button.onclick = this.addRecord;
    
  }

  addRecord()
  {
    console.log("1")
    let name = this.record_obj_name.value;

    // let quantity = this.record_obj_quantity.value;
    // let price = this.record_obj_price.value;
    console.log(typeof(name))
  }
}
  
let receipt = new Receipt()
