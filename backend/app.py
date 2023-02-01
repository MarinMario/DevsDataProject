import flask
import flask_cors
import datetime
import event
import json
import registration
import uuid

app = flask.Flask(__name__)
flask_cors.CORS(app)
event_list = [
    event.Event(0,"Carla's Dreams", datetime.date(2023, 10, 2), datetime.date(2023,10,5), "/images/event1.jpg"),
    event.Event(1, "Delia", datetime.date(2023,2,3), datetime.date(2023,2,4), "/images/event2.jpg")
]
registration_list = []

@app.route("/events")
def events():
    json_string = []
    for event in event_list:
        json_string.append(event.__dict__)
    
    return json_string

@app.route("/register/<id>")
def register(id):
    code = str(uuid.uuid1())
    registration_list.append(registration.Registration(int(id), code))
    return code

@app.route("/delete/<code>")
def delete(code):
    deleted = False
    for i in range(len(registration_list)-1, -1, -1):
        if registration_list[i].code == code:
            registration_list.pop(i)
            deleted = True

    return str(deleted)

@app.route("/cancelAsManager/<code>")
def cancel_as_manager(code):
    deleted = False
    currentEvent = findEventByID(findRegistrationByCode(code).event_id)
    removalCondition1 = (currentEvent.end_date - currentEvent.start_date).days >= 2
    removalCondition2 = (currentEvent.start_date - datetime.date.today()).days >= 2
    for i in range(len(registration_list)-1, -1, -1):
        if registration_list[i].code == code and removalCondition1 and removalCondition2:
            registration_list.pop(i)
            deleted = True

    return str(deleted)

@app.route("/registrations")
def registrations():
    json_string = []
    for registration in registration_list:
        json_string.append(registration.__dict__)
    
    return json_string

def findEventByID(id):
    for i in event_list:
        if i.id == id:
            return i
    return None

def findRegistrationByCode(code):
    for i in registration_list:
        if i.code == code:
            return i
    return None

if __name__ == "__main__":
    app.run(debug=True)