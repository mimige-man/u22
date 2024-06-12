src="https://code.jquery.com/jquery-3.6.0.min.js"
integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4="
crossorigin="anonymous"
    const modal = document.getElementById('easyModal');
    const buttonClose = document.getElementsByClassName('modalClose')[0];

    // ボタンがクリ�?クされた時
    function modalOpen() {
        modal.style.display = 'block';
    }

    // バツ印がクリ�?クされた時
    buttonClose.addEventListener('click', modalClose);
        function modalClose() {
            modal.style.display = 'none';
        }

    // モーダルコン�?ン�?以外がクリ�?クされた時
    addEventListener('click', outsideClose);
        function outsideClose(e) {
            if (e.target == modal) {
                modal.style.display = 'none'
        }
    }
    //月毎�?�日数
    let month_days =[31,28,31,30,31,30,31,31,30,31,30,31];
    //フォー�?の取�?
    const form = document.forms.checkes;   
    
    var vals = []; // 配�?�を定義

    //↓平�?が選択された場合、平�?以外と日単位�?�期間を選択できなくす�?

    //各Chekboxのドキュメン�?
    let average = document.getElementById("average");
    let max_average = document.getElementById("max_average");
    let min_average = document.getElementById("min_average");
    let max = document.getElementById("max");
    let min = document.getElementById("min");
    //平�?グループと平�?以外�?�グルー�?
    let averages = document.getElementById('averages');
    let day_date = document.getElementById('day_date');
    
    //checkboxをクリ�?クしたときに呼ばれる関数
    //例：if->max,minにクラスhiddenを追�?、変数valsに値を追�?。elseif->max,minのhiddenを削除、変数valsから値を削除
    average.onchange=function(){
        average_if();
        if(average.checked){
            vals.push(average.value);
        }else if(vals.indexOf(average.value) !== -1){
            vals.splice(vals.indexOf(average.value),1);
        }
        arry_clear();
        console.log(vals);
    }
    max_average.onchange=function(){
        average_if();
        if(max_average.checked){
            vals.push(max_average.value);
        }else if(vals.indexOf(max_average.value) !== -1){
            vals.splice(vals.indexOf(max_average.value),1);
        }
        console.log(vals);
        arry_clear();
    }
    min_average.onchange=function(){
        average_if();
        if(min_average.checked){
            vals.push(min_average.value);
        }else if(vals.indexOf(min_average.value) !== -1){
            vals.splice(vals.indexOf(min_average.value),1);
        }
        arry_clear();
        console.log(vals);
    }
    max.onchange=function(){
        day_date_if();
        if(max.checked){
            vals.push(max.value);
        }else if(vals.indexOf(max.value) !== -1){
            //delete vals[vals.indexOf(max.value)];
            vals.splice(vals.indexOf(max.value),1);
        }
        arry_clear();
        console.log(vals);
    } 
    min.onchange=function(){
        day_date_if();
        if(min.checked){
            vals.push(min.value);
        }else if(vals.indexOf(min.value) !== -1){
            vals.splice(vals.indexOf(min.value),1);
        }
        arry_clear();
        console.log(vals);
    }    

    //チェ�?クボックスが押されたら呼び出�?
    function average_if(){
        if(average.checked || max_average.checked || min_average.checked){
            max.classList.add('hidden');
            min.classList.add('hidden');
            day_date.classList.add('hidden');
        }
        else if(!average.checked && !max_average.checked && !min_average.checked){
            if(max.classList.contains('hidden')){
                max.classList.remove('hidden');
                day_date.classList.remove('hidden');
            }
            if(min.classList.contains('hidden')){
                min.classList.remove('hidden');
                day_date.classList.remove('hidden');
            }
        }
    }

    function day_date_if(){
        if(max.checked || min.checked){
            average.classList.add('hidden');
            max_average.classList.add('hidden');
            min_average.classList.add('hidden');
            averages.classList.add('hidden');
        }
        else if(!max.checked && !min.checked){
            average.classList.remove('hidden');
            max_average.classList.remove('hidden');
            min_average.classList.remove('hidden');
            averages.classList.remove('hidden');
        }
    }
    //radio.y_dataが一つも選択されて�?なければ配�?�を初期�?
    function arry_clear(){
        let count = 0;
        for(var i=0; i<form.y_data.length-1;i++){
            if(form.y_data[i].checked){
                count++;
            }
        }
        if(count == 0){
            vals=[];
        }
    }

    
    function graphDataSet(){
        $.ajax({
            'url':'{% url "test:graphCreatData %}',
            'type':'POST',
            'data':{
                'y_data':vals,
                'x_top_data':top_arry,
                'x_last_data':last_arry,
            },
            'dataType': 'json'
        })
    }

    document.getElementById('log').onclick=function(){
        console.log(x_date_top);
    }
    
    //プルダウンメニュー
    const selectBox1 = document.getElementById('topyearSelect');
    const selectBox2 = document.getElementById('endyearSelect');
    const selectBox3 = document.getElementById('topmonthSelect');
    const selectBox4 = document.getElementById('endmonthSelect');
    const startYear = 1946;
    const endYear = 2022;
    const startMonth = 1;
    const endMonth = 12;

    //初めの年のプルダウンメニュー
    for(let year = startYear; year <= endYear; year++){
        const option1 = document.createElement('option');
        option1.value = year;
        option1.textContent = year;
        selectBox1.appendChild(option1);

    //終わり�?�年のプルダウンメニュー
        const option2 = document.createElement('option');
        option2.value = year;
        option2.textContent = year;
        selectBox2.appendChild(option2);
    }

    //初めの月�?�プルダウンメニュー
    for(let month = startMonth; month <= endMonth; month++){
        const option1 = document.createElement('option');
        option1.value = month;
        option1.textContent = month;
        selectBox3.appendChild(option1);

    //終わり�?�月�?�プルダウンメニュー
        const option2 = document.createElement('option');
        option2.value = month;
        option2.textContent = month;
        selectBox4.appendChild(option2);
    }