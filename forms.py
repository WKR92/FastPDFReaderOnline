from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed
from wtforms import SubmitField
from wtforms.validators import DataRequired


class UploadPDFForm(FlaskForm):
    pdfFile = FileField('Upload your PDF file here: ', validators=[DataRequired(), FileAllowed(['pdf'])])
    submit = SubmitField("Submit pdf")