// ********************* TABS *********************

const tabHeader = document.querySelectorAll(".tab-head"),
    tabText = document.querySelectorAll(".tab-text");

tabHeader.forEach(tabElementHeader => {
    tabElementHeader.addEventListener("click", clickTab);
});

function clickTab(e) {
    let tabAtr = e.target.getAttribute("data-tab");
    for (i = 0; i < tabText.length; i++) {
        if (tabAtr == i) {
            tabText[i].classList.add("active");
        } else {
            tabText[i].classList.remove("active");
        }
    }
}

// *********************END TABS *********************

// ********************* LOAD SKILS *********************

const progressHtml = document.querySelector(".progress-html"),
    progressCss = document.querySelector(".progress-css"),
    progressJs = document.querySelector(".progress-js"),
    progressReact = document.querySelector(".progress-react");

let fieldHtml = 0,
    fieldCss = 0,
    fieldJs = 0,
    fieldReact = 0,
    timer;

function loadingHtml() {
    document.querySelector("#html").innerHTML = fieldHtml + "%";
    progressHtml.style.width = fieldHtml + "%";
    fieldHtml++;
    let timer = setTimeout(loadingHtml, 10);
    if (fieldHtml == 91) {
        clearTimeout(timer);
        loadingCss();
    }
}
loadingHtml();

function loadingCss() {
    document.querySelector("#css").innerHTML = fieldCss + "%";
    progressCss.style.width = fieldCss + "%";
    fieldCss++;
    let timer = setTimeout(loadingCss, 10);
    if (fieldCss == 81) {
        clearTimeout(timer);
        loadingJs();
    }
}

function loadingJs() {
    document.querySelector("#js").innerHTML = fieldJs + "%";
    progressJs.style.width = fieldJs + "%";
    fieldJs++;
    let timer = setTimeout(loadingJs, 10);
    if (fieldJs == 74) {
        clearTimeout(timer);
        loadingReact();
    }
}

function loadingReact() {
    document.querySelector("#react").innerHTML = fieldReact + "%";
    progressReact.style.width = fieldReact + "%";
    fieldReact++;
    let timer = setTimeout(loadingReact, 10);
    if (fieldReact == 53) {
        clearTimeout(timer);
    }
}

// *********************END LOAD SKILS *********************

// ********************* THEME *********************
const pageTheme = document.getElementById("theme"),
    wordList = document.querySelector(".word-list"),
    infoHeader = document.querySelector(".info-header"),
    proStatH2 = document.querySelectorAll(".pro-stat-h2"),
    contentInfo = document.querySelectorAll(".content-info"),
    moreInfo = document.querySelector('.more-info'),
    headerMainContentSkils = document.querySelectorAll(
        ".header-main-content-skils"
    ),
    interesText = document.querySelector(".interes-text");

pageTheme.addEventListener("change", function() {
    if (pageTheme.value === "light") {
        document.body.classList.add("light-body");
        wordList.classList.add("word-list-light");
        infoHeader.classList.add("info-header-light");
        proStatH2.forEach(item => {
            item.classList.add("pro-stat-h2-light");
        });
        contentInfo.forEach(item => {
            item.classList.add("content-info-light");
        });
        headerMainContentSkils.forEach(item => {
            item.classList.add("header-main-content-skils-light");
        });
        interesText.classList.add("interes-text-light");
        moreInfo.classList.add('more-info-light');
    } else if (pageTheme.value === "dark") {
        document.body.classList.remove("light-body");
        wordList.classList.remove("word-list-light");
        infoHeader.classList.remove("info-header-light");
        proStatH2.forEach(item => {
            item.classList.remove("pro-stat-h2-light");
        });
        contentInfo.forEach(item => {
            item.classList.remove("content-info-light");
        });
        headerMainContentSkils.forEach(item => {
            item.classList.remove("header-main-content-skils-light");
        });
        interesText.classList.remove("interes-text-light");
        moreInfo.classList.remove('more-info-light');
    }
});
// *********************END THEME *********************

// ********************* MODAL *********************

const buttonEnter = document.querySelector(".footer-button"),
    modalWindow = document.querySelector(".modal-wrap"),
    loginForm = document.querySelector(".login-form"),
    login = document.querySelector(".login-input"),
    pass = document.querySelector(".login-password"),
    buttonEnterForm = document.querySelector(".popUp-enter"),
    redMini = document.querySelectorAll(".mini");

buttonEnter.addEventListener("click", function() {
    modalWindow.style.display = "flex";
});

modalWindow.addEventListener("click", function(e) {
    if (e.target.className === "modal-wrap" || e.target.className === "close") {
        modalWindow.style.display = "none";
    }
});

loginForm.addEventListener("keyup", function(e) {
    if (e.keyCode === 13) {
        if (login.value.toLowerCase() === "admin" && pass.value.toLowerCase() === "admin") {
            document.location.href = "./pages/nextPage.html";
        } else {
            redMini.forEach(redItem => {
                redItem.style.display = "block";
            });
        }
    }
});

buttonEnterForm.addEventListener("click", function() {
    if (login.value.toLowerCase() === "admin" && pass.value.toLowerCase() === "admin") {
        document.location.href = "./pages/nextPage.html";
    } else {
        redMini.forEach(redItem => {
            redItem.style.display = "block";
        });
    }
});

// *********************END MODAL *********************

// *********************TELEGRAM BOT*********************

const token = "1056896310:AAF3z3e1jiOqHrVw2QvYVn9JhcVE5p56nmo";

const nameInput = document.querySelector(".name"),
    emailInput = document.querySelector(".email"),
    messageInput = document.querySelector(".message"),
    btnSend = document.querySelector(".send-btn"),
    errorMail = document.querySelector('.error-mail'),
    infoFooterP = document.querySelector('.info-footer-p');


btnSend.addEventListener("click", sendMessage);



function sendMessage() {
    const reg = /.+@.+\..+/i;
    const prov = reg.test(emailInput.value);

    if ((!nameInput.value || !messageInput.value || !emailInput.value) || (prov == false)) {
        errorMail.style.display = 'block';
        return;
    } else {
        errorMail.style.display = 'none';
        let url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=376998584&text=${nameInput.value} ${emailInput.value} ${messageInput.value}`;
        fetch(url, { method: "GET" })
            .then(res => {
                console.log(res.statusText);
                okMessage();
            })
            .catch(err => {
                console.error(err + ' erroriwe');
                errorMessage();
            })
        nameInput.value = "";
        emailInput.value = "";
        messageInput.value = "";
    }

}

function errorMessage() {
    const footer = document.querySelector('.footer');
    const errorMessage = document.createElement('div');
    errorMessage.innerHTML = `<div>Что то пошло не так! возможно у Вас не работает VPN =)</div>`;
    errorMessage.classList.add('error-message');
    footer.prepend(errorMessage);
    setTimeout(() => {
        errorMessage.remove();
    }, 4000);
}

function okMessage() {
    const footer = document.querySelector('.footer')
    const okMessage = document.createElement('div');
    okMessage.innerHTML = `<div>Сообщение отправлено</div>`;
    okMessage.classList.add('ok-message');
    footer.prepend(okMessage);
    setTimeout(() => {
        okMessage.remove();
    }, 4000);
}
// *********************END TELEGRAM BOT*********************