from math import log
import json

from flask import Flask, request
from sklearn.externals import joblib


app = Flask(__name__)
COLS = ['age', 'current_position_years', 'experience_years', 'is_automated_test', 'is_backend', 'is_caba', 'is_cba', 'is_cloud', 'is_computer_degree', 'is_developer', 'is_docker', 'is_frontend', 'is_gba', 'is_lowlevelstuff', 'is_male', 'is_mobile', 'is_nosql', 'is_pba', 'is_santafe', 'is_sql', 'is_startup', 'is_sysadmin', 'is_unix', 'is_vmware', 'is_windows', 'log_in_charge_of', 'study']


def is_desistemas(x):
    x = str(x).lower()
    return int('sistemas' in x or 'informática' in x or 'informatica' in x or 'computación' in x or 'computacion' in x or 'programador' in x or 'programación' in x)


def experience_years(y):
    return {
        '1': 1,
        '2': 2,
        '3': 3,
        '4': 4,
        '5': 5,
        '6': 6,
        '7': 7,
        '8': 8,
        '9': 9,
        '10+': 10,
        'Menos de un año': 0,
    }.get(y, 0)


def transform_row(row):
    d = {}
    all_techs = ','.join((
        str(row['Tecnologías que utilizás']),
        str(row['Tecnologías que utilizás.1']),
        str(row['Tecnologías que utilizás.2']),
        str(row['Tecnologías que utilizás.3']),
        str(row['Tecnologías que utilizás.4']),
    ))
    for key, tech in {
        'unix': ('Linux', '*BSD', 'AIX', 'OpenStack', 'Solaris', 'HP-UX'),
        'windows': ('Windows',),
        'vmware': ('VMWare',),
        'docker': ('Docker / Containers',),
        'cloud': ('Azure', 'Amazon Web Services'),
        'frontend': ('Javascript', 'HTML', 'CSS', 'jQuery'),
        'backend': ('Java', 'PHP', 'Python', '.NET', 'NodeJS', 'C#', 'Ruby', 'Perl', 'Go', 'Scala'),
        'lowlevelstuff': ('VB*', 'C++', 'C,', 'ABAP'),
        'mobile': ('Swift', 'Objective-C'),
        'automated_test': ('Selenium', 'Visual Studio Coded UI', 'OpenQA', 'HP LoadRunner', 'Test Complete', 'Watir', 'Postman', 'RSpec', 'JMeter'),
        'sql': ('Oracle', 'MSSQL', 'MySQL', 'MariaDB', 'PostgreSQL', 'SQL'),
        'nosql': ('Redis', 'MongoDB', 'Hadoop', 'Cassandra', 'Google bigQuery'),
    }.items():
        d['is_{}'.format(key)] = int(any(map(lambda t: t in all_techs, tech)))
    d.update({
        'is_male': int(row['Me identifico'] == 'Hombre'),
        'age': {
            '27 - 30': 28.5,
            '31 - 33': 32,
            '34 - 36': 35,
            '37 - 40': 38.5,
            '24 - 26': 25,
            '21 - 23': 22,
            '41 - 45': 43,
            '46 - 49': 48.5,
            '50+': 57,
            '18 - 20': 19,
            'Menos de 18 años': 17,
        }.get(row['Tengo'], 0),
        'is_caba': int(row['Argentina'] == 'Ciudad Autónoma de Buenos Aires'),
        'is_gba': int(row['Argentina'] == 'GBA'),
        'is_pba': int(row['Argentina'] == 'Provincia de Buenos Aires'),
        'is_cba': int(row['Argentina'] == 'Córdoba'),
        'is_santafe': int(row['Argentina'] == 'Santa Fe'),
        'experience_years': experience_years(row['Años de experiencia']),
        'current_position_years': experience_years(row['Años en el puesto actual']),
        'log_in_charge_of': log(int(row['¿Cuánta?'] or 0) + 1, 10),
        'study': {
            'Primario (Incompleto)': 0,
            'Primario (En curso)': 0,
            'Primario (Completado)':1,
            'Secundario (Incompleto)': 2,
            'Secundario (En curso)': 3,
            'Secundario (Completado)': 4,
            'Terciario (Incompleto)': 5,
            'Terciario (En curso)': 5,
            'Universitario (En curso)': 5,
            'Universitario (Incompleto)': 5,
            'Terciario (Completado)': 6,
            'Universitario (Completado)': 7,
            'Doctorado (En curso)': 7,
            'Posgrado (En curso)': 7,
            'Posgrado (Incompleto)': 7,
            'Doctorado (Incompleto)': 7,
            'Posgrado (Completado)': 8,
            'Doctorado (Completado)': 9,
        }.get('{} ({})'.format(row['Nivel de estudios alcanzado'], row['Estado']), 0),
        'is_computer_degree': is_desistemas(row['Carrera']),
        'is_developer': int(row['Trabajo de'] == 'Developer'),
        'is_sysadmin': int(row['Trabajo de'] == 'SysAdmin / DevOps'),
        'is_startup': int(row['Cantidad de empleados'] in ('1-10', '11-50')),
    })
    if 'Salario mensual (en tu moneda local)' in row:
        d['salary'] = int(row['Salario mensual (en tu moneda local)'])
    return d


def normalize_row(transformed_row):
    coef = [151.70203214, -685.50802952, 2434.84114844, -4047.42939233, 6029.79360353, 15706.06153398, 3886.11912516,5164.01802446, 1250.41976432,2532.97039583, 2765.60359266, -5132.80648558, 8385.4376816 , 986.08582901, 9019.89150783, 5226.07873885, -4841.97685841, 7769.7083706 , 5669.07038301, -2011.87001105, -5181.60456778, 4854.15011668, -3535.10455882, -3112.94497783, -9329.53818993, 17842.64480006, 3158.0331521]
    print(transformed_row)
    return [transformed_row[col] * coef[i] for i, col in enumerate([col for col in COLS])]


@app.route('/predict', methods=['POST'])
def predict():
    fields = {
        'Me identifico',
        'Tengo',
        'Argentina',
        'Años de experiencia',
        'Años en el puesto actual',
        '¿Gente a cargo?',
        '¿Cuánta?',
        'Nivel de estudios alcanzado',
        'Estado',
        'Carrera',
        'Realizaste cursos de especialización',
        'Trabajo de',
        'Tecnologías que utilizás',
        'Tecnologías que utilizás.1',
        'Tecnologías que utilizás.2',
        'Automation o funcional?',
        'Tecnologías que utilizás.3',
        'Tecnologías que utilizás.4',
        'Tipo de contrato',
        'Cantidad de empleados',
    }
    row = {f: request.form.get(f, '') for f in fields}
    row_transformed = transform_row(row)
    print(json.dumps(row_transformed, indent=4, sort_keys=True))
    row_normalized = normalize_row(row_transformed)
    # models = { for model in ('rfr', 'lr', 'knn')}
    return json.dumps({
        'rfr': joblib.load('rfr.pkl').predict([[row_transformed[col] for col in COLS]])[0],
        'lr': joblib.load('lr.pkl').predict([[row_transformed[col] for col in COLS]])[0],
        'knn': joblib.load('knn.pkl').predict([normalize_row(row_transformed)])[0],
    })
