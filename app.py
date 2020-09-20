from flask import Flask,request, make_response, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS, cross_origin
from werkzeug.utils import secure_filename

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = '/uploadsFlask'

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///data.sqlite3'
app.config['CORS_HEADERS'] = 'Content-Type'

db = SQLAlchemy(app)

CORS(app, resources={r"/*": {"origins": "*"}})

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

        return make_response("Syllabus Added Successfully")

if __name__ == "__main__":
    db.create_all()
    app.run(debug=True)
