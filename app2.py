from flask import Flask, render_template, make_response, request
import pdfkit

app = Flask(__name__)

@app.route('/')
def index():
	return render_template('index.html')

@app.route('/downloadPDF', methods=['GET', 'POST'])
def pdf_template():
	phoneNumber = request.form['phoneNumber']
	email = request.form['email']
	names = request.form['names']
	bio = request.form['bio']
	studyDuration = request.form['studyDuration']
	nameOfInstitution = request.form['nameOfInstitution']
	nameOfQualification = request.form['nameOfQualification']
	workDuration = request.form['workDuration']
	nameOfCompany = request.form['nameOfCompany']
	jobTitle = request.form['jobTitle']
	jobDescription = request.form['jobDescription']
	skills1 = request.form['skills1']
	skills2 = request.form['skills2']
	skills3 = request.form['skills3']
	skills4 = request.form['skills4']
	skills5 = request.form['skills5']

	rendered = render_template('basic_template.html', phoneNumber=phoneNumber, email=email, names=names, bio=bio, studyDuration=studyDuration, nameOfInstitution=nameOfInstitution, nameOfQualification=nameOfQualification, workDuration=workDuration, nameOfCompany=nameOfCompany, jobTitle=jobTitle, jobDescription=jobDescription, skills1=skills1, skills2=skills2, skills3=skills3, skills4=skills4, skills5=skills5)

	css = ['basic.css']

	pdf = pdfkit.from_string(rendered, False, css=css)
	
	response = make_response(pdf)
	response.headers['Content-Type'] = 'application/pdf'
	response.headers['Content-Disposition'] = 'inline; filename=output.pdf'
	
	return response

if __name__ == '__main__':
	app.run(debug=True)