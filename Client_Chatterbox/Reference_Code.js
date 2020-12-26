// eslint-disable-next-line
const app = {
    // ? 1. fetching에 사용될 변수와 함수를 app 객체에 모아둔다.
    server: "http://52.78.206.149:3000/messages",

    // ? 2. 웹 시작 시 실행될 initializer이다.
    init: () => {
        app.addEventHandlers();
        app.fetch((json) => {
            json.results.forEach(app.renderMessage);
        });
    },

    // ? 3. app.fetch의 결과인 data를 순회하며 renderMessage를 실행한다.
    fetchAndRender: () => {
        app.fetch((data) => {
            data.results.forEach(app.renderMessage);
        });
    },

    // ? 4. submit버튼이 로드되면 이벤트리스너를 추가한다.
    addEventHandlers: () => {
        let submit = document.querySelector("#send .submit");
        if (submit) {
            submit.addEventListener("submit", app.handleSubmit);
        }
    },

    // ? 5. fetch => json() => 콜백을 한 번에 하는 fetch 메서드이다.
    fetch: (callback) => {
        window
            .fetch(app.server)
            .then((resp) => {
                return resp.json();
            })
            .then(callback);
    },

    // ? 6. POST 타입으로 fetch한다.
    send: (data, callback) => {
        window
            .fetch(app.server, {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then((resp) => {
                return resp.json();
            })
            .then(callback);
    },

    // ? 7. message를 지운다.
    clearMessages: () => {
        document.querySelector("#chats").innerHTML = "";
    },

    // ? 8. input의 값을 비운다.
    clearForm: () => {
        document.querySelector(".inputUser").value = "";
        document.querySelector(".inputChat").value = "";
    },

    // ? 9. XSS 방어용으로 메세지를 필터링한다. 정규표현식 사용!
    renderMessage: ({ username, text, date, roomname }) => {
        const tmpl = `<div class="chat">
        <div class="username">${username
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")}</div>
        <div>${text.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</div>
        <div>${date}</div>
        <div>${roomname.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</div>
      </div>`;

        document.querySelector("#chats").innerHTML =
            tmpl + document.querySelector("#chats").innerHTML;
    },

    // ? 10. message를 비운다. 새 정보를 app 객체에 보내고, fetchAndRender를 실행시킨다.
    // ? 이후 Form을 비운다.
    handleSubmit: (e) => {
        e.preventDefault();
        app.clearMessages();
        app.send({
                username: document.querySelector(".inputUser").value,
                text: document.querySelector(".inputChat").value,
                roomname: "Anon",
            },
            () => {
                app.fetchAndRender();
                app.clearForm();
            }
        );
    },
};

app.init();