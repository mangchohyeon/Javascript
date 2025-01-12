const ary_skin = 
[
    "dry_skin",
    "combination_skin",
    "oily_skin",
    "dehydrated_oily_skin", 
    "sensitive_skin",
    "acne-prone_skin"
];

const ary_trouble =
[
    "winkle",
    "sebum",
    "oily and dry",
    "dehydrating",
    "sensitive",
    "black/white head"
];


let message = null,skin_index = [],trouble_index = [];

//class="radio_skin"인 radio 버튼을 선택
const radio_skin = document.querySelectorAll('.radio_skin');

// 각 radio_skin 버튼에 change 이벤트 리스너를 추가합니다.
radio_skin.forEach(radio => {
  radio.addEventListener('change', () => {
    // 선택된 radio 버튼의 value 값을 가져옵니다.
    const selectedValue = radio.value;
    for(let i = 0; i<6; i++)
    {
        if(selectedValue == ary_skin[i])
        {
            skin_index.push(i+1);
        }
    }
  });
});

// 모든 class="radio_trouble"인 radio 버튼을 선택합니다.
const radio_trouble = document.querySelectorAll('.radio_trouble');

// 각 radio 버튼에 change 이벤트 리스너를 추가합니다.
radio_trouble.forEach(radio => {
  radio.addEventListener('change', () => {
    // 선택된 radio 버튼의 value 값을 가져옵니다.
    const selectedValue = radio.value;
    for(let i = 0; i<6; i++)
    {
        if(selectedValue == ary_trouble[i])
        {
            trouble_index.push(i+1);
        }
    }
  });
});


 
  

function print_res()
{
    const a = (comb_ph*50-(Math.pow(10,-1*water_ph) * 49));
    const res = -1*Math.log10(a);
    let message = "ph = " + String(Math.round(res)) + "\n피부 타입 : ";
    for(let i =0; i< skin_index.length; i++)
    {
      message += skin_index[i] + '번 ';
    }
    message += "\n트러블 : "
    for(let i = 0; i< trouble_index.length; i++)
    {
      message += trouble_index[i]+'번 ';
    }

    alert(message);
}

const input_comb_ph = document.getElementById("input_comb_ph");
const input_water_ph = document.getElementById("input_water_ph");
let comb_ph = null, water_ph = null, volume = null;

function get_comb_ph()
{
    comb_ph = input_comb_ph.value;
    if( !(water_ph == null))
    {
      print_res();
    }
};

input_comb_ph.addEventListener("change", get_comb_ph);

function get_water_ph()
{
    water_ph = input_water_ph.value;
    if(!(comb_ph == null))
    {
      print_res();
    }
};

input_comb_ph.addEventListener("change", get_water_ph);

