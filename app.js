const query = document.getElementById('search')
const submitBtn = document.getElementById('submit')
const BASE_URL = 'http://localhost:5000/api/words'

function checkIfStringHasSpecialCharacter(str) {
    console.log("special character")
    const re = /[`!@#$%^&*()_+\-=\[\]{};':"\\|.<>\/?~]/;
    return re.test(str);
}
function checkIfStringHasNumbers(str) {
  return /\d/.test(str);
}
//검색어에 숫자가 들어간 경우 검색이 안되도록 함

//검색어에 영어가 들어간 경우 검색이 안되도록 함
function checkIfStringHasLetter(str) {
    return /[a-zA-Z]/.test(str);
}
function enableSubmitbtn(state) {
    submitBtn.disabled =state
}


//서버 데이터 가져오기
function getData(baseUrl, query){
    console.log('서버 접속중...')
    //사용자 이력 유효성 검증
    if (checkIfStringHasSpecialCharacter(query)){
        enableSubmitbtn(false)//활성화
        container.innerHTML = "Your search keyword has special character. Retry only hangle"
        return;
    }
    if (checkIfStringHasNumbers(query)){
        enableSubmitbtn(false)//활성화
        container.innerHTML = "Your search keyword has numbers. Retry only hangle"
        return;
    }
    if (checkIfStringHasLetter(query)){
        enableSubmitbtn(false)//활성화
        container.innerHTML = "우리는 한국인입니다. 한글을 입력해주세요"
        return;
    }
    fetch(`${baseUrl}/${query}`, {
        headers:{
            "Content-Type": "application/json"
        }
    })
    .then(res => res.json())
    .then(data => {
        //버튼 활성화
        submitBtn.disabled =false //활성화
        console.log(data)
        const {words} = data; //data를 밖으로 꺼내주는 것 
        //데티터 유효성 검증
        if(words.length === 0){
            container.innerHTML = "NO Words Found!"
            return;
        }

        const template = words.map(word => {
            return (
            `
                <div class = "item">
                    <div class = "word"><a href = ${word.r_link}>${word.r_word}</a><sup>${word.r_seq ? word.r_seq : ""}</sup></div>
                    <p class="hanga">${word.r_chi}</p>
                    <p class="description">${word.r_des}</p>
                   
                </div>
            `
            )
        })
        container.innerHTML = template.join("") //DOM에 Template 삽입
    })
}

submitBtn.addEventListener('click', function(){
    console.log(query.value)
    //버튼 비활성화
    this.disabled = true
    getData(BASE_URL, query.value) //5초
})
query.addEventListener("keypress",function(e) {
    if (e.keyCode===13){
        getData(BASE_URL, query.value)   
    }
})
window.addEventListener('DOMcontentLoaded', function(){
   getData(BASE_URL), 5000
})