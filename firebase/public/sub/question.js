const backButton = document.getElementById('back-button');
const homeButton = document.querySelector('.xi-home-o');
const homePopUp = document.querySelector('.homePopUp');
const closeButton = document.getElementById('close');
const progressBar = document.getElementById('progress_bar');
const qCount = document.querySelectorAll('.q-count');
const loadIcon = document.querySelector('lord-icon');
let pageCount = 1;
progressBar.style.width = (progressBar.dataset.width * pageCount * 0.833) + `%`;

const questionList = document.getElementById('question_list');
const answerList = document.getElementsByName('answer');
const labelList = document.getElementsByTagName('label');
const questionArray = ['주위 친구들이 모두 코인을 시작했다. 나도 시작해볼까?', '갑자기 먹고 싶은 음식이 생겼다.', '유망하다는 코인이 상장되었다. 이럴 때 나는?', '내가 산 코인이 오르고 있다. 이럴 때 나는',
    '나는 낯선 사람과 인사하는 자리에서', '내가 팀원을 직접 짤 수 있다면?', '친구가 내가 산 주식 회사를 욕한다.', '택시에서 기사 아저씨가 계속 말을 걸 때 나는', '2박 3일 여행 떠나기 전날 나는',
    '친구가 산 땅의 가격이 세배가 되었다.', '음식점에서 점원에게 신메뉴를 추천받았을 때 나는', '어느날 복권에 당첨되어 10억을 얻었다. 그렇다면 나는']
const answerArray = [['\'기초 지식부터 쌓아야지!\'<br>여기저기서 정보를 찾아본다.', 'S', '\'시작이 반이지!\'<br>일단 이더리움부터 매수한다.', 'N'], ['집에서 혼자 배달시켜 먹는다.', 'I', '같이 먹을 친구를 찾아본다.', 'E'],
['\‘트렌드에 따라야지!\’ 당장 매입', 'S', '\‘안정성이 최고야!\' 이미 검증된 코인에 투자', 'N'], ['\'역시 내 판단이 맞았어!\'<br>오른 가격에 더 구매한다.', 'T', '당장 팔아서 이익을 실현한다.', 'F'],
['TMI 남발하다 맞팔까지 완', 'E', '어떤 얘기할지 머리가 복잡해진다', 'I'], ['무조건 실력 뛰어난 팀원으로', 'S', '나와 친하거나 시너지낼 수 있는 팀원으로', 'N'], ['감히 내 회사를! 친구와 싸운다.', 'T', '공감하며 같이 욕한다.', 'F'],
['같이 신나게 얘기를 하며<br>목적지까지 대화를 이어간다.', 'E', '간단히 대답 후 슬며시 이어폰을 낀다.', 'I'], ['예약 일정을 한번 더 체크하고 잔다.', 'S', '어떤 낭만이 있을까?<br>상상력을 풀가동하다가 못 잔다.', 'N'],
['배는 아프지만 친구의 실력을 인정한다.', 'T', '친구의 운이 좋았다고 생각한다', 'F'], ['신메뉴보다는 익숙한 메뉴를 주문한다.', 'S', '솔깃해서 신메뉴를 주문한다.', 'N'], ['이건 내 돈! 전부 예금에 넣어둔다.', 'J', '어차피 꽁으로 얻은 돈, 전부 잃어도 상관없다. 코인에 몰빵!!', 'P']];
const loadingPage = 'loading.html';
let mbtiResult = new Map();
let checkedId = '';

// 로컬 저장소 비우기
localStorage.clear();

// 로컬 저장소에 저장하기
function saveAnswers(currentId) {
    const answerString = JSON.stringify(currentId);
    localStorage.setItem(`${pageCount}`, answerString);
}

// 로컬 저장소에서 가져오기
function loadAnswers() {
    const answers = localStorage.getItem(`${pageCount}`);
    if (answers !== null) {
        checkedId = JSON.parse(answers);
    } else {
        checkedId = '';
    }
}

// 홈버튼 눌렀을 때 팝업
homeButton.addEventListener('click', function () {
    homePopUp.style.display = 'block';
})

closeButton.addEventListener('click', function () {
    homePopUp.style.display = 'none';
})

homePopUp.addEventListener('click', function () {
    homePopUp.style.display = 'none';
})

// 선택지 골랐을 때
answerList.forEach((radio) => {
    radio.addEventListener("click", (e) => {
        const current = e.currentTarget;
        if (current.checked) {
            mbtiResult.set(`${qCount[0].textContent}`, current.value);
            saveAnswers(current.id);
            showNextQuestion();
        }
    });
})

// 뒤로가기 버튼 눌렀을 때 이전 질문, 문항, 프로그레스바 업데이트
backButton.addEventListener('click', function () {
    if (pageCount == 1) {
        return;
    }
    pageCount -= 1;
    qCount[1].textContent = pageCount;
    qCount[0].textContent = `${pageCount.toString().padStart(2, '0')}.`
    progressBar.style.width = progressBar.dataset.width * pageCount * 0.833 + `%`;

    questionList.textContent = questionArray[pageCount - 1];
    labelList[0].innerHTML = answerArray[pageCount - 1][0];
    answerList[0].value = answerArray[pageCount - 1][1];
    labelList[1].innerHTML = answerArray[pageCount - 1][2];
    answerList[1].value = answerArray[pageCount - 1][3];

    showProgressIcon();
    checkedRadio();
})

// 다음 질문, 문항, 프로그레스바 업데이트
function showNextQuestion() {
    // 마지막 문제를 풀면 로딩페이지로 이동, 결과값 배열 로컬 스토리지에 저장
    if (pageCount == 12) {
        let arr = [...mbtiResult.values()];
        const resultString = JSON.stringify(arr);
        localStorage.setItem('mbtiResult', resultString);
        location.href = loadingPage;
        return;
    }
    pageCount += 1;

    qCount[1].textContent = pageCount;
    qCount[0].textContent = `${pageCount.toString().padStart(2, '0')}.`
    progressBar.style.width = (progressBar.dataset.width * pageCount * 0.833) + `%`;

    questionList.textContent = questionArray[pageCount - 1];
    labelList[0].innerHTML = answerArray[pageCount - 1][0];
    answerList[0].value = answerArray[pageCount - 1][1];
    labelList[1].innerHTML = answerArray[pageCount - 1][2];
    answerList[1].value = answerArray[pageCount - 1][3];

    showProgressIcon();
    //checkedNextRadio(); // 2.6 호범
    checkedRadio();
}

// 로컬 저장소에 저장된 데이터를 가져와 체크했었던 라디오 버튼 체크
function checkedRadio() {
    loadAnswers();
    if (checkedId !== '') {
        answerList.forEach(radio => {
            radio.checked = false;
            if (radio.id === checkedId) {
                radio.checked = true;
            }
        });
    } else {
        answerList.forEach(radio => {
            radio.checked = false;
        });
    }
}

function checkedNextRadio() { // 2.6 호범
    answerList.forEach(radio => radio.checked = false);
}

// 프로그레스바 위에 아이콘
function showProgressIcon() {
    let calWidth = progressBar.offsetWidth - 28;
    loadIcon.style.transform = `translateX(${calWidth}px)`;
}