const url = "http://127.0.0.1:5000"

async function home() {
    let registrationsDiv = document.getElementById("registrations")
    

    await fetch(url + '/registrations')
    .then(response => response.text())
    .then(text => {
        let registrationsData = JSON.parse(text)
        for(let i = 0; i < registrationsData.length; i++) {
            registrationsDiv.innerHTML += `
                <div>name: ${registrationsData[i].name}</div>
                <div>code: ${registrationsData[i].code}</div>
                <div>event id: ${registrationsData[i].event_id}</div>
                <button onclick="cancelEvent('${registrationsData[i].code}')">cancel</button>
                <br>
                <br>
            `
        }
    })
}

async function cancelEvent(code) {
    await fetch(url + "/cancelAsManager/" + code)
        .then(response => response.text())
        .then(deleted => {
            if(deleted === "True") {
                window.location.reload()
            } else {
                alert(`registration with code: ${code} can't be cancelled because it doesn't respect the conditions`)
            }
        })
}

home()