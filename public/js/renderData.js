
exports.renderData= (template,data)=>{
    let rows ="";
    let counter=1;

    //data =data.slice(0,9); //just fetch 10 records for sample;

console.log("this is render data");

data.forEach(el=>{
   if(counter>1000){  
     
    template = template.replace("{%records%}", rows);

   return template;}
   let newRecord =  `<tr>
      <td>${counter}</td>
      <td>${el.hshd_num}</td>
      <td>${el.basket_num}</td> 
      <td>${el.purchase_}</td>
      <td>${el.product_num}</td>
      <td>${el.product_transactions.department}</td> 
      <td>${el.product_transactions.commodity}</td>
      <td>${el.spend}</td>
      <td>${el.units}</td> 
      <td>${el.store_r}</td>
      <td>${el.week_num}</td>
      <td>${el.year}</td> 
      <td>${el.household_transactions.l}</td>
      <td>${el.household_transactions.age_range}</td>
      <td>${el.household_transactions.marital}</td>
      <td>${el.household_transactions.income_range}</td> 
      <td>${el.household_transactions.homeowner}</td>
      <td>${el.household_transactions.hshd_composition}</td>
      <td>${el.household_transactions.hh_size}</td> 
      <td>${el.household_transactions.children}</td>
      </tr>`
      rows= rows + newRecord;

      counter++;


})


  template = template.replace("{%records%}", rows);

  return template;


}

