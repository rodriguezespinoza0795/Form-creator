from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

user = 'root'
password = ''
host = '127.0.0.1:3306'
database = 'test'
SQLALCHEMY_DATABASE_URL = 'mysql+pymysql://{}:{}@{}/{}'.format(user, password, host, database)

engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()