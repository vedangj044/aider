from flask import Flask,request, make_response, jsonify, g
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS, cross_origin
from werkzeug.utils import secure_filename
from flaskthreads import AppContextThread
from tokenizer import extractor, reader
from findContent import getContent
import pyrebase
from storyMaker import generateStory

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = '/uploadsFlask'

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///data.sqlite3'
app.config['CORS_HEADERS'] = 'Content-Type'

db = SQLAlchemy(app)

CORS(app, resources={r"/*": {"origins": "*"}})

configFirebase = eval(open("key.txt", "r").read())

class subject(db.Model):
    __tablename__ = 'subject'

    id = db.Column(db.Integer, primary_key=True)
    subject_ = db.Column(db.String(150), nullable=False)
    year_ = db.Column(db.String(10), nullable=False)
    branch_ = db.Column(db.String(50), nullable=False)
    syllabus_ = db.Column(db.LargeBinary)

class topic(db.Model):
    __tablename__ = "topic"

    id = db.Column(db.Integer, primary_key=True)
    subjectId = db.Column(db.Integer, db.ForeignKey("subject.id"))
    subject = db.relationship("subject", foreign_keys=subjectId)
    topic = db.Column(db.String(500), nullable=False)
    isVideo = db.Column(db.Boolean)
    summary = db.Column(db.Text)


@app.route('/process_syllabus', methods=['POST'])
def syllabus():
    if request.method == 'POST':
        subject__ = request.form.get('subject')
        year = request.form.get('year')
        branch = request.form.get('branch')
        file = request.files['syllabus']

        file.save(secure_filename(file.filename))
        item = subject(subject_=subject__, year_=year,
            branch_=branch, syllabus_=file.read())

        db.session.add(item)
        db.session.commit()

        g.file = file.filename
        g.year_ = year
        g.subject_ = subject__
        g.branch_ = branch

        theard_  = AppContextThread(target = updateSyllabusToFirebase)
        theard_.start()

        return make_response("Syllabus Added Successfully")

def updateSyllabusToFirebase():
    text = extractor(reader(g.file).full_text).final_list

    db = firebase.database()

    l = []
    for i in text:
        topics = i.split(",")
        for j in topics:
            te = getContent(j)
            data = {"topic": j, "isVideo": te.isVideo, "summary": te.summary}
            db.child("syllabus").child(g.year_).child(g.branch_).child(g.subject_).push(data)
            l.append(te.summary)

    with open("new.txt", "w") as outfile:
        outfile.write("\n".join(i for i in l))
    print("DONE!!")

l = {}

def stream_handler(message):
    if message["event"] == "put" and message["data"] is not None:
        if isinstance(message["data"], dict):
            l.update(message["data"])
        else:
            print(message["path"])
            path = message["path"].split("/")[1:]
            l[path[0]][path[1]][path[2]] = message["data"]
            if path[1] == "option1":
                text = l[path[0]]["answer"].replace("____", str(message["data"]))
                generateStory(text, path[0]+".png")
                storage = firebase.storage()
                storage.child("images/"+path[0]+".png").put(path[0]+".png")
                print(storage.child("images/"+path[0]+".png").get_url(None))


def stream_handler1(message):
    if message["event"] == "put":
        name = ""
        if isinstance(message["data"], dict):
            name = list(message["data"].keys())[0]
            generateStory(message["data"][name], name+".png")
        else:
            name = message["path"].split("/")[1:][0]
            generateStory(message["data"], name+".png")
        name = name+".png"
        storage = firebase.storage()
        storage.child("images/"+name).put(name)



if __name__ == "__main__":
    db.create_all()
    firebase = pyrebase.initialize_app(configFirebase)

    db = firebase.database()
    my_stream = db.child("poll").stream(stream_handler)
    my_stream_annoucement = db.child("announcement").stream(stream_handler1)

    app.run(debug=True)
