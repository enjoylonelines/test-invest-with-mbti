const resultMBTI = localStorage.getItem('mbti'); //결과 mbti 문자열
let fitMBTI, oppMBTI;
const INCREMENT_VALUE = 1;
function setMBTI(resultMBTI){
    switch(resultMBTI){
        case 'ENTP':
            fitMBTI = 'INFJ';
            oppMBTI = 'ISTJ';
            break;

        case 'ENTJ':
            fitMBTI = 'INFP';
            oppMBTI = 'ISFJ';
            break;

        case 'INFP':
            fitMBTI = 'ENFJ';
            oppMBTI = 'ISFP';
            break;

        case 'INFJ':
            fitMBTI = 'ENFP';
            oppMBTI = 'ESTP';
            break;

        case 'ISTP':
            fitMBTI = 'ESTJ';
            oppMBTI = 'INFJ';
            break;

        case 'ISTJ':
            fitMBTI = 'ESFP';
            oppMBTI = 'INFJ';
            break;

        case 'ESFP':
            fitMBTI = 'ISTJ';
            oppMBTI = 'INFP';
            break;

        case 'ESFJ':
            fitMBTI = 'ISFP';
            oppMBTI = 'INFP';
            break;

        case 'ENFP':
            fitMBTI = 'INTJ';
            oppMBTI = 'ESFP';
            break;
            
        case 'ENFJ':
            fitMBTI = 'INFP';
            oppMBTI = 'ISTP';
            break;

        case 'ESTP':
            fitMBTI = 'ISFJ';
            oppMBTI = 'ENFJ';
            break;

        case 'ESTJ':
            fitMBTI = 'INTP';
            oppMBTI = 'ENFP';
            break;

        case 'INTP':
            fitMBTI = 'ENTJ';
            oppMBTI = 'ISFJ';
            break;

        case 'INTJ':
            fitMBTI = 'ENTP';
            oppMBTI = 'ESFJ';
            break;

        case 'ISFP':
            fitMBTI = 'ESFJ';
            oppMBTI = 'INFP';
            break;

        case 'ISFJ':
            fitMBTI = 'ESTP';
            oppMBTI = 'ENFP';
            break;
    }
}
const firebaseConfig = {
    apiKey: "AIzaSyBdfmSH87sn639a8IIGNFElKQ1ol61FR9I",
    authDomain: "project-flip-the-card.firebaseapp.com",
    databaseURL: "https://project-flip-the-card-default-rtdb.firebaseio.com",
    projectId: "project-flip-the-card",
    storageBucket: "project-flip-the-card.appspot.com",
    messagingSenderId: "849022846127",
    appId: "1:849022846127:web:52f9cb5ac1fa06cd9f805a",
    measurementId: "G-EWCWXDQ8G9"
};
// firebase 초기화
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
function downloadImg(){ 
    const storage = firebase.storage();
    const storageRef = storage.ref();
    const mainImageRef = storageRef.child(`images/${resultMBTI}.png`);
    const fitImageRef = storageRef.child(`images/${fitMBTI}.png`);
    const oppImageRef = storageRef.child(`images/${oppMBTI}.png`);

    mainImageRef.getDownloadURL().then(function (url) {
        const $img = document.getElementById('main_img');
        $img.src = url;
    }).catch(function (error) {
        console.error('이미지 다운로드 실패: ', error);
    });

    fitImageRef.getDownloadURL().then(function (url) {
        const $img = document.querySelectorAll('.fit_img');
        $img.forEach((item)=>{item.src = url});
    }).catch(function (error) {
        console.error('이미지 다운로드 실패: ', error);
    });

    oppImageRef.getDownloadURL().then(function (url) {
        const $img = document.querySelectorAll('.opp_img');
        $img.forEach((item)=>{item.src = url});
    }).catch(function (error) {
        console.error('이미지 다운로드 실패: ', error);
    });
}
function downloadData(){
    db.collection('mbti-category').doc(`${resultMBTI}`).get()
    .then((result) => {
        const $mainTitle = document.querySelector('.result_title');
        const $subTitle = document.querySelector('.sub_title');
        const $tendency = document.querySelector('.mbti_tendency');
        const $caution = document.querySelector('.mbti_caution');
        
        $mainTitle.innerHTML = result.data().main_title;
        $subTitle.innerHTML = result.data().sub_title;
        $tendency.innerHTML = result.data().tendency;
        $caution.innerHTML = result.data().caution;
    })
    .catch(function (error){
        console.error('텍스트 데이터 다운로드 실패: ', error);
    });    
}
function downloadFitData(){
    db.collection('mbti-category').doc(`${fitMBTI}`).get()
    .then((result) => {
        const $mainTitle = document.querySelector('#fit_main_title');
        const $innerMainTitle = document.querySelector('.fit_result_title');
        const $subTitle = document.querySelector('.fit_sub_title');
        const $tendency = document.querySelector('.fit_mbti_tendency');
        const $caution = document.querySelector('.fit_mbti_caution');
        
        $mainTitle.innerHTML = result.data().main_title;
        $innerMainTitle.innerHTML = result.data().main_title;
        $subTitle.innerHTML = result.data().sub_title;
        $tendency.innerHTML = result.data().tendency;
        $caution.innerHTML = result.data().caution;
    })
    .catch(function (error){
        console.error('텍스트 데이터 다운로드 실패: ', error);
    });    
}
function downloadOppData(){
    db.collection('mbti-category').doc(`${oppMBTI}`).get()
    .then((result) => {
        const $mainTitle = document.querySelector('#opp_main_title');
        const $innerMainTitle = document.querySelector('.opp_result_title');
        const $subTitle = document.querySelector('.opp_sub_title');
        const $tendency = document.querySelector('.opp_mbti_tendency');
        const $caution = document.querySelector('.opp_mbti_caution');
        
        $mainTitle.innerHTML = result.data().main_title;
        $innerMainTitle.innerHTML = result.data().main_title;
        $subTitle.innerHTML = result.data().sub_title;
        $tendency.innerHTML = result.data().tendency;
        $caution.innerHTML = result.data().caution;
    })
    .catch(function (error){
        console.error('텍스트 데이터 다운로드 실패: ', error);
    });    
}
async function downloadRatio(){
    const participantsRef = await db.collection('Number-of').doc('participants');
    let updateObj = {};
    updateObj[resultMBTI] =  await firebase.firestore.FieldValue.increment(INCREMENT_VALUE);
    updateObj['total_par'] = await firebase.firestore.FieldValue.increment(INCREMENT_VALUE);
    await participantsRef.update(updateObj); // MBTI 수 업데이트

    await participantsRef.get()
    .then((result) => {
        const $percent = document.getElementById('percent');
        const numOfSameMbti = result.data()[resultMBTI];
        const numOfTotalMbti = result.data().total_par; // 여기서 저장된 800이 나와야 하는데 1이 나옵니다.
        const resultPercent = Math.ceil(numOfSameMbti/numOfTotalMbti * 100) + '%'; 
        $percent.innerHTML =  resultPercent;
    })
    .catch(function (error){
        console.error('비율 데이터 다운로드 실패: ', error);
    });    
}
setMBTI(resultMBTI);
downloadData();
downloadFitData();
downloadOppData();
downloadImg();
downloadRatio();
