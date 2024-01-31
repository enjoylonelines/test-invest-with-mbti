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
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const db = firebase.firestore();
  db.collection('mbti-category').doc('ENTJ').get().then((result)=>{
    const $mainTitle = document.querySelector('.result_title');
    const $subTitle = document.querySelector('.sub_title');
    const $tendency = document.querySelector('.mbti_tendency');
    const $caution = document.querySelector('.mbti_caution');
   
    $mainTitle.innerHTML = result.data().main_title;
    $subTitle.innerHTML = result.data().sub_title;
    $tendency.innerHTML = result.data().mbti_tendency;
    $caution.innerHTML = result.data().mbti_caution;
    $tendency.append(tendencyText);
    $caution.append(cautionText);
    });