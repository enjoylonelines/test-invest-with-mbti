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
let MAX = 0;
function downloadData(){
    db.collection('Number-of').doc('participants').get()
    .then((result) => {
       MAX = result.data().total_par;
    })
    .then(()=>{
        const $counter = document.querySelector('#count_people');
        counter($counter, MAX); 
    })
    .catch(function (error){
        console.error('텍스트 데이터 다운로드 실패: ', error);
    });    
}
function counter($counter, max) {
    let now = max;
  
    const handle = setInterval(() => {
      $counter.innerHTML = Math.ceil(max - now);
    
      // 목표에 도달하면 정지
      if (now < 1) {
        clearInterval(handle);
      }
    
      // 적용될 수치, 점점 줄어듬
      const step = now / 10;
  
      now -= step;
    }, 50);
}
downloadData();
