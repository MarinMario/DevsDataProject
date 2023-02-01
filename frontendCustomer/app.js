const url = "http://127.0.0.1:5000"



async function home() {
    let eventsDiv = document.getElementById("events")

    await fetch(url + '/events')
    .then(response => response.text())
    .then(text => {
        eventsData = JSON.parse(text)
        for(let i = 0; i < eventsData.length; i++) {
            eventsDiv.innerHTML += `
                <div>${eventsData[i].title}</div>
                <img class="thumbnail" src=${eventsData[i].thumbnail}>
                <div>start date: ${eventsData[i].start_date} </div>
                <div>end date: ${eventsData[i].end_date} </div>
                <button onclick="register(${eventsData[i].id})">register for this event</button>
                <br>
                <br>
            `
        }
    })
}

async function register(id) {
    await fetch(url + "/register/" + id)
    .then(response => response.text())
    .then(code => {
        alert(`your code is ${code}`)
    })
}

async function deleteRegistration() {
    let code = document.getElementById("registration-code").value

    await fetch(url + "/delete/" + code)
    .then(response => response.text())
    .then(deleted => {
        if(deleted === "True") {
            alert(`registration with code: ${code} was cancelled`)
        } else {
            alert(`registration with code: ${code} doesn't exist`)
        }
    })
}

home()