const resultMBTI = localStorage.getItem('mbti'); //결과 mbti 문자열
const INCREMENT_VALUE = 1;
let numOfTotalMbti;
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
    // Storage에서 이미지 가져오기
    const storageRef = storage.ref();
    const imageRef = storageRef.child(`images/${resultMBTI}.png`);

    // 이미지 다운로드 URL 가져오기
    imageRef.getDownloadURL().then(function (url) {
    // 이미지를 표시할 HTML 요소 선택
    const $img = document.getElementById('main_img');

    // 이미지 로드
    $img.src = url;
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
        const participantsRef = db.collection('Number-of').doc('participants');
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
        console.log(numOfSameMbti)
        numOfTotalMbti = result.data().total_par; // 여기서 저장된 800이 나와야 하는데 1이 나옵니다.
        console.log(numOfTotalMbti)
        const resultPercent = Math.ceil(numOfSameMbti/numOfTotalMbti * 100) + '%'; 
        $percent.innerHTML =  resultPercent;
    })
    .catch(function (error){
        console.error('비율 데이터 다운로드 실패: ', error);
    });    
}
downloadData();
downloadImg();
downloadRatio();
