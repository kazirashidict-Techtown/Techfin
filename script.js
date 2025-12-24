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
  const tbody=document.querySelector('#rechargeTable tbody'); tbody.innerHTML='';
  data.forEach((item,index)=>{
    const tr=document.createElement('tr');
    tr.innerHTML=`<td>${item.date}</td><td>${item.amount}</td><td>${item.type}</td>
      <td>${item.note}</td><td>${item.payment}</td>
      <td><button onclick="deleteRow(${index})">Delete</button></td>`;
    tbody.appendChild(tr);
  });
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