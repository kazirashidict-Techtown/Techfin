let data = JSON.parse(localStorage.getItem('rechargeData')||'[]');

function saveData(){localStorage.setItem('rechargeData',JSON.stringify(data));}

function addRecharge(){
  const date=document.getElementById('date').value;
  const amount=parseFloat(document.getElementById('amount').value);
  const type=document.getElementById('type').value;
  const note=document.getElementById('note').value;
  const payment=document.getElementById('payment').value;
  if(!date||!amount){alert('Date and Amount required');return;}
  data.push({date,amount,type,note,payment});
  saveData(); renderTable(); updateTotals();
  document.getElementById('date').value=''; document.getElementById('amount').value='';
}

function renderTable(){
  const tbody = document.querySelector('#rechargeTable tbody');
  tbody.innerHTML = '';
  data.forEach((item,index)=>{
    const tr=document.createElement('tr');
    tr.innerHTML=`
      <td contenteditable="true" onblur="updateCell(${index},'date',this.innerText)" data-label="Date">${item.date}</td>
      <td contenteditable="true" onblur="updateCell(${index},'amount',this.innerText)" data-label="Amount">${item.amount}</td>
      <td contenteditable="true" onblur="updateCell(${index},'type',this.innerText)" data-label="Type">${item.type}</td>
      <td contenteditable="true" onblur="updateCell(${index},'note',this.innerText)" data-label="Utility">${item.note}</td>
      <td contenteditable="true" onblur="updateCell(${index},'payment',this.innerText)" data-label="Payment">${item.payment}</td>
      <td><button onclick="deleteRow(${index})">Delete Row</button></td>
    `;
    tbody.appendChild(tr);
  });
}

function updateCell(index,key,value){
  if(key==='amount') value = parseFloat(value)||0;
  data[index][key] = value;
  saveData(); updateTotals();
}

function updateTotals(){
  let totals={Electricity:0,"Air/WiFi":0,Other:0,Overall:0};
  data.forEach(d=>{
    totals.Overall+=d.amount;
    if(d.type==='Electricity') totals.Electricity+=d.amount;
    else if(d.type==='Air/WiFi') totals["Air/WiFi"]+=d.amount;
    else totals.Other+=d.amount;
  });
  document.getElementById('electricityTotal').innerText=`Electricity: ৳${totals.Electricity}`;
  document.getElementById('airTotal').innerText=`Air/WiFi: ৳${totals["Air/WiFi"]}`;
  document.getElementById('otherTotal').innerText=`Other: ৳${totals.Other}`;
  document.getElementById('overallTotal').innerText=`Overall: ৳${totals.Overall}`;
}

function deleteRow(index){if(confirm('Delete this entry?')){data.splice(index,1);saveData();renderTable();updateTotals();}}

renderTable(); updateTotals();