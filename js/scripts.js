/*!
* Start Bootstrap - Blog Home v5.0.8 (https://startbootstrap.com/template/blog-home)
* Copyright 2013-2022 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-blog-home/blob/master/LICENSE)
*/
// This file is intentionally blank
// Use this file to add JavaScript to your project

let currentPage = 0;
let totalPage = 0;
let pageSize = 5;

function search() {
    let anchor = document.createElement("a");
    let hostname = window.location.hostname ? window.location.hostname : 'http://codenfast.com';
    let utmcode = 'https://www.google.com/search?&oq=site&&q=site:' + hostname + ' ' + document.getElementById("search-input").value;
    utmcode = utmcode + "&utm_source=" + document.getElementsByTagName('title')[0].innerText;
    anchor.href = utmcode;
    anchor.title = document.getElementById("search-input").value;
    anchor.target = '_blank';
    let linkText = document.createTextNode(document.getElementById("search-input").value);
    anchor.appendChild(linkText);
    anchor.click();
}

function changePage(event) {
    currentPage = Math.floor(Number(event.target.dataset.page));
    handlePaging();
}

function handlePaging() {
    const userAction = async () => {
        const response = await fetch('http://app.codenfast.com:9001/api/rest/web-site/grid-website-sayfa-ozet', {
            method: 'POST',
            body: '{"page":'+(currentPage * pageSize)+',"pageSize":'+((currentPage+1) * pageSize)+',"sortField":"tarih","sortOrder":-1,"filters":{"pasif":false,"kurum":"{\\"id\\":\\"2d40a455-cacd-42d3-95ab-4cdafa4f282a\\"}"}}',
            headers: {
                'Content-Type': 'application/json',
                'authentication': 'eyJhbGciOiAiSFMyNTYiLCAidHlwIjogIkpXVCJ9.eyJpZCI6IjgwM2MwMmUxLWNmZmItNDIyZC05ZDAxLWJjMDExYjU4NzdkNSIsInBhc2lmIjpudWxsLCJrYXlpdFRhcmloaSI6bnVsbCwiZ3VuY2VsbGVtZVRhcmloaSI6bnVsbCwia2F5ZGVkZW4iOm51bGwsImd1bmNlbGxleWVuIjpudWxsLCJzb25HaXJpcyI6bnVsbCwiZW1haWxEb2dydWxhbm1pcyI6bnVsbCwidGNLaW1saWtObyI6bnVsbCwic295YWQiOiJBZG1pbiIsInJlcGFzcyI6bnVsbCwiYWRtaW4iOnRydWUsImxhbmd1YWdlIjoidHJfVFIiLCJrdWxsYW5pY2lLdXJ1bVlldGtpTGlzdCI6bnVsbCwiZG9ndW1UYXJpaGkiOm51bGwsInRlbGVmb24iOm51bGwsImFkcmVzIjpudWxsLCJlbWFpbCI6ImNvZGVuZmFzdEBnbWFpbC5jb20iLCJrdWxsYW5pY2lBZGkiOiJhZG1pbiIsImVtYWlsRG9ncnVsYW1hS29kdSI6bnVsbCwiYWQiOiJDb2RlbmZhc3QiLCJzb25DaWtpcyI6MTY2NzM4MjI0NDQ0Miwia3VsbGFuaWNpR3J1cCI6bnVsbCwia3VsbGFuaWNpQXlhckJhY2tncm91bmQiOm51bGwsImt1bGxhbmljaUF5YXJUaGVtZSI6bnVsbCwic2lmcmVZZW5pbGUiOm51bGwsInJlc2ltIjpudWxsLCJrdWxsYW5pY2lBeWFyT2RlbWVUaXBCYXNpdCI6bnVsbCwia3VsbGFuaWNpQXlhclZhcnNheWlsYW5PZGVtZVRpcGkiOm51bGx9.eURDYndMeTB0YzNZeXJaYmJUM3czS3lHY3lFTmg4czdQM3dzdU91bnFCYz0='
            }
        });
        refreshData(await response.json());
    }
    userAction().then();
}

function refreshData(response) {
    totalPage = Math.floor(response.tableModel.count / pageSize);
    for(let i = 0; i < document.getElementsByClassName('card-content').length ; i++) {
        setTimeout(() => {
        document.getElementsByClassName('card-content')[i].classList.add("blurred");
        setTimeout(() => {
            if(response.tableModel.data.length > i) {
                document.getElementsByClassName('card-content')[i].classList.remove("fade-out");
                document.getElementsByClassName('card-content')[i].children[0].children[0].src = response.tableModel.data[i].oneCikanResim;
                document.getElementsByClassName('card-content')[i].children[1].children[0].textContent = new Date(response.tableModel.data[0].tarih).toDateString();
                document.getElementsByClassName('card-content')[i].children[1].children[1].textContent = response.tableModel.data[i].baslik;
                document.getElementsByClassName('card-content')[i].children[1].children[2].textContent = response.tableModel.data[i].aciklama ? response.tableModel.data[i].aciklama : '';
                let hostname = window.location.hostname ? window.location.hostname : 'http://codenfast.com';
                let url = hostname;
                if(response.tableModel.data[i].webSiteSayfaTip.en_US === 'Blog') {
                    url = url + '/category/' +response.tableModel.data[i].webSiteKategori.url + '/page/'+response.tableModel.data[i].url;
                } else if(response.tableModel.data[i].webSiteSayfaTip.en_US === 'Static') {
                    url = url + '/static/'+response.tableModel.data[i].url;
                }
                url = url + "?utm_source=" + document.getElementsByTagName('title')[0].innerText;
                document.getElementsByClassName('card-content')[i].children[1].children[3].href = url;
                document.getElementsByClassName('card-content')[i].classList.remove("blurred");
            } else {
                document.getElementsByClassName('card-content')[i].classList.add("fade-out");
            }
        }, i * (75));
        }, i * (150));
    }
   // document.getElementsByClassName('container')[0].scrollIntoView({ block: 'start',  behavior: 'smooth' });
    refreshPaging();
}

function refreshPaging() {
    let child = document.getElementsByClassName('pagination')[0].lastElementChild;
    while (child) {
        document.getElementsByClassName('pagination')[0].removeChild(child);
        child = document.getElementsByClassName('pagination')[0].lastElementChild;
    }

    if(currentPage > 4) {
        const li = document.createElement('li');
        li.classList.add('page-item');
        const anchor = document.createElement('a');
        anchor.classList.add('page-link');
        anchor.href = '#!';
        anchor.onclick = changePage;
        anchor.dataset.page="0";
        anchor.textContent="0";
        li.appendChild(anchor);
        document.getElementsByClassName('pagination')[0].appendChild(li);
        // <li class="page-item disabled"><a class="page-link" href="#!">...</a></li>
        const liDisabled = document.createElement('li');
        liDisabled.classList.add('page-item');
        const anchorDisabled = document.createElement('a');
        anchorDisabled.classList.add('page-link');
        anchorDisabled.classList.add('disabled');
        anchorDisabled.href = '#!';
        anchorDisabled.setAttribute('disabled', 'disabled');
        anchorDisabled.textContent = '...';
        liDisabled.appendChild(anchorDisabled);
        document.getElementsByClassName('pagination')[0].appendChild(liDisabled);
    }

    for(let i = Math.max(0, currentPage - 3) ; i < (currentPage + 3) && i <= totalPage ; i++) {
        const li = document.createElement('li');
        li.classList.add('page-item');
        if(i === currentPage) {
            li.classList.add('active');
        }
        const anchor = document.createElement('a');
        anchor.classList.add('page-link');
        anchor.href = '#!';
        anchor.onclick = changePage;
        anchor.dataset.page=i.toString();
        anchor.textContent = i.toLocaleString();
        li.appendChild(anchor);
        document.getElementsByClassName('pagination')[0].appendChild(li);
    }
    if((currentPage + 5) < totalPage) {
        const li = document.createElement('li');
        li.classList.add('page-item');
        const anchor = document.createElement('a');
        anchor.classList.add('page-link');
        anchor.classList.add('disabled');
        anchor.href = '#!';
        anchor.setAttribute('disabled', 'disabled');
        anchor.textContent = '...';
        li.appendChild(anchor);
        document.getElementsByClassName('pagination')[0].appendChild(li);
    }
}

window.onload = function () {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            let element = entry.target;
            if (entry.isIntersecting && (!element.classList.contains('imJustLooking-left') && !element.classList.contains('imJustLooking-right'))) {
                let randomClass = 'imJustLooking-' + ((Math.random() > 0.5) ? 'left' : 'right');
                element.classList.add(randomClass);
                // return;
            }
            // if(element.classList.contains('imJustLooking-left')) {
            //     element.classList.remove('imJustLooking-left');
            // } else {
            //     element.classList.remove('imJustLooking-right');
            // }
        });
    });

    let cards = document.getElementsByClassName("card");
    for (let i = 0; i < cards.length; i++) {
        observer.observe(cards[i]);
    }

    const loading = document.getElementById('loading');
    setTimeout(() => {
        loading.classList.add("fade-out");
        setTimeout(() => {
            const cookie = document.getElementById('cookie');
            cookie.classList.replace("invisible", "fade-in");
            setTimeout(() => {
                cookie.classList.remove("fade-in");
                setTimeout(() => {
                    cookie.classList.add("fade-out");
                }, 4500);
            }, 2000);
        }, 50);
    }, 2000);

    // handlePaging();
};

window.onbeforeunload = function (event) {
    setTimeout(() => {
        const loading = document.getElementById('loading');
        loading.classList.replace("invisible", "fade-in");
    }, 50);

    // This is for all other browsers
    return s;
}


setInterval(() => {
    let randomTagList = [];
    for (let i = 0; i < document.getElementsByClassName("card-title").length; i++) {
        randomTagList.push(document.getElementsByClassName("card-title")[i]);
    }
    for (let i = 0; i < document.getElementsByClassName("btn btn-primary").length; i++) {
        randomTagList.push(document.getElementsByClassName("btn btn-primary")[i]);
    }
    for (let i = 0; i < document.getElementsByClassName("small text-muted").length; i++) {
        randomTagList.push(document.getElementsByClassName("small text-muted")[i]);
    }
    for (let i = 0; i < document.getElementsByClassName("page-link").length; i++) {
        randomTagList.push(document.getElementsByClassName("page-link")[i]);
    }
    setTimeout(() => {
        const randomTag = randomTagList[Math.floor(Math.random() * randomTagList.length)];
        if (!randomTag.classList.contains("crazy-glitch")) {
            randomTag.classList.add("crazy-glitch");
            setTimeout(() => {
                randomTag.classList.remove("crazy-glitch");
            }, 4500);
        }
    }, 1000);
}, 2000);