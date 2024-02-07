Kakao.init('f9122508d484bc7362c5b24b818c716d');

function share_sendSns(sns) {
    let thisUrl = document.URL;
    let snsTitle = "재미로 보는 투자 성향 테스트";
        if( sns == 'facebook' ) {
            let url = "http://www.facebook.com/sharer/sharer.php?u="+encodeURIComponent(thisUrl);
            window.open(url, "", "width=486, height=286");
        }
        else if(sns == 'kakaotalk'){
            
            Kakao.Link.sendDefault({
                objectType: 'feed',
                content: {
                  title: '투자 성향 테스트',
                  description: '재미로 보는 투자 성향 테스트',
                  imageUrl: 'https://firebasestorage.googleapis.com/v0/b/project-flip-the-card.appspot.com/o/images%2Fmeta_img.jpg?alt=media&token=cd523934-95fd-420b-9d2f-098ef8bd0912',
                  link: {
                    mobileWebUrl: 'https://project-flip-the-card.web.app',
                    webUrl: 'https://project-flip-the-card.web.app',
                  },
                },
                installTalk: true,
             });
        }
        else if( sns == 'twitter' ) {
            let url = "http://twitter.com/share?url="+encodeURIComponent(thisUrl)+"&text="+encodeURIComponent(snsTitle);
            window.open(url, "tweetPop", "width=486, height=286,scrollbars=yes");
        }
        else if( sns == 'copyUrl' ) {
            let url = ''; 
            let textarea = document.createElement("textarea");  
           
            document.body.appendChild(textarea); 
            url = window.document.location.href; 
            textarea.value = url; 
            textarea.select(); 
            document.execCommand("copy");   
            document.body.removeChild(textarea);
            
            alert("URL이 복사되었습니다.");
        } 
    }