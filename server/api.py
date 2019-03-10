from math import exp
import os
import json

from flask import Flask, request
from flask_cors import CORS
from sklearn.externals import joblib
import pandas as pd


app = Flask(__name__)
CORS(app)

df = pd.read_csv(os.path.join(os.path.dirname(os.path.abspath(__file__)), '../notebook/2019.1 - Encuesta de remuneración salarial - Argentina.csv'), skiprows=3)
df = df[df['Años de experiencia'] < 40]
df = df[df['Tengo'] < 80]
df = df[df['Años en la empresa actual'] < 40]
df = df[(df['Salario mensual BRUTO (en tu moneda local)'] >= 10000) & (df['Salario mensual BRUTO (en tu moneda local)'] <= 300000)]
DATA = df

def years_exp(y):
    y = float(y)
    if y < 8: return int(y)
    if y < 20: return 2 * (y // 2) # 6->6, 7->6, 8->8, 9->8
    return (y // 5) * 5

@app.route('/predict', methods=['POST'])
def predict():
    fields = [
        'Me identifico',
        'Tengo',
        'Dónde estás trabajando',
        '¿Gente a cargo?',
        'Carrera',
        'Universidad',
        'Realizaste cursos de especialización',
        '¿Contribuís a proyectos open source?',
        'Trabajo de',
        '¿Qué SO usás en tu laptop/PC para trabajar?',
        '¿Y en tu celular?',
        'Tipo de contrato',
        '¿Sufriste o presenciaste situaciones de violencia laboral?',
        'Orientación sexual',
        'Cantidad de empleados',
        'Actividad principal',
        'years_exp',
        'years_company',
        'studied',
        'is_windows',
        'is_lambda',
        'is_vmware',
        'is_containers',
        'is_cloud',
        'is_other',
        'is_backend',
        'is_frontend',
        'is_.net',
        'is_mobile_fw',
        'is_frontend_fw',
        'is_cms',
        'is_backend_fw',
        'is_sql',
        'is_nosql',
        'is_NetBeans',
        'is_Vi',
        'is_Eclipse',
        'is_IntelliJ',
        'is_Vim',
        'is_Notepad++',
        'is_Sublime Text',
        'is_Visual Studio'
    ]
    row = [
        request.form.get('Me identifico', ''),
        request.form.get('Tengo', ''),
        request.form.get('Dónde estás trabajando', ''),
        request.form.get('¿Gente a cargo?', ''),
        request.form.get('Carrera', ''),
        request.form.get('Universidad', ''),
        request.form.get('Realizaste cursos de especialización', ''),
        request.form.get('¿Contribuís a proyectos open source?', ''),
        request.form.get('Trabajo de', ''),
        request.form.get('¿Qué SO usás en tu laptop/PC para trabajar?', ''),
        request.form.get('¿Y en tu celular?', ''),
        request.form.get('Tipo de contrato', ''),
        request.form.get('¿Sufriste o presenciaste situaciones de violencia laboral?', ''),
        request.form.get('Orientación sexual', ''),
        request.form.get('Cantidad de empleados', ''),
        request.form.get('Actividad principal', ''),
        years_exp(request.form.get('Años de experiencia', '')),
        years_exp(request.form.get('Años en la empresa actual', '')),
        '{} {}'.format(request.form.get('Nivel de estudios alcanzado', ''), request.form.get('Estado', '')),
        int('Windows' in request.form.get('Plataformas', '')),
        int('Serverless' in request.form.get('Plataformas', '')),
        int('VMWare' in request.form.get('Plataformas', '')),
        int('Docker' in request.form.get('Plataformas', '') or 'Kubernetes' in request.form.get('Plataformas', '')),
        int(len(set(request.form.get('Plataformas', '').split(', ')) & set(['Azure', 'Amazon Web Services', 'Google Cloud Platform/App Engine', 'OpenStack', 'Heroku', 'IBM Cloud / Watson'])) > 0),
        int(len(set(request.form.get('Lenguajes de programación', '').split(', ')) & set(['VB*', 'C++', 'C', 'ABAP'])) > 0),
        int(len(set(request.form.get('Lenguajes de programación', '').split(', ')) & set(['Java', 'PHP', 'Python', '.NET', 'NodeJS', 'C#', 'Ruby', 'Perl', 'Go', 'Scala'])) > 0),
        int(len(set(request.form.get('Lenguajes de programación', '').split(', ')) & set(['Javascript', 'HTML', 'CSS', 'jQuery'])) > 0),
        int('.NET Core' in request.form.get('Frameworks, herramientas y librerías', '')),
        int('Cordova' in request.form.get('Frameworks, herramientas y librerías', '')),
        int(len(set(request.form.get('Frameworks, herramientas y librerías', '').split(', ')) & set(['Angular', 'React.js', 'Vue.js'])) > 0),
        int(len(set(request.form.get('Frameworks, herramientas y librerías', '').split(', ')) & set(['WordPress', 'Drupal'])) > 0),
        int(len(set(request.form.get('Frameworks, herramientas y librerías', '').split(', ')) & set(['Node.js', 'Django', 'Laravel'])) > 0),
        int(len(set(request.form.get('Bases de datos', '').split(', ')) & set(['MySQL', 'MSSQL', 'PostgreSQL', 'Oracle', 'MariaDB', 'Microsoft Azure', 'IBM Db2'])) > 0),
        int(len(set(request.form.get('Bases de datos', '').split(', ')) & set(['MongoDB', 'ElasticSearch', 'Redis', 'Amazon DynamoDB', 'Cassandra', 'Google Cloud Storage'])) > 0),
        int('NetBeans' in request.form.get('IDEs', '')),
        int('Vi' in request.form.get('IDEs', '')),
        int('Eclipse' in request.form.get('IDEs', '')),
        int('IntelliJ' in request.form.get('IDEs', '')),
        int('Vim' in request.form.get('IDEs', '')),
        int('Notepad++' in request.form.get('IDEs', '')),
        int('Sublime Text' in request.form.get('IDEs', '')),
        int('Visual Studio' in request.form.get('IDEs', '')),
    ]
    s = pd.Series(row, index=fields)
    knn = joblib.load('../models/knn.pkl')
    return json.dumps({
        'xgb': exp(joblib.load('../models/xgb.pkl').predict([s])[0]),
        'knn': exp(knn.predict([s])[0]),
        'neighbors': [
            # pandas has a to_json method but not a "to_json_serializiable" so... this is what we have
            json.loads(DATA.iloc[x].to_json())
            for x
            in knn.steps[1][1].kneighbors(knn.steps[0][1].transform([s]), 3, False)[0]
        ],
    })
