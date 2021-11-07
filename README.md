# Form-creator
### Create your own forms and analyze the results.

1. Clone or download this repository `git clone https://github.com/rodriguezespinoza0795/Form-creator.git`
2. Create your own virtual environment and activate it.  
**Windows:**  
	* `py -m venv venv `  
	* `source venv/Scripts/activate`

	**Mac OS**:
	* `virtualenv venv` or `virtualenv -p /usr/local/bin/python3 venv`
	* `source venv/bin/activate`
3. Install dependencies: `pip install -r requirements.txt`
4. Start server: `uvicorn sql_app.main:app --reload`
5. If you have a port error run the following commands
`sudo lsof -i:8080` and `kill -9 $PID`

* Access interactive documentation with Swagger UI: http://127.0.0.1:8000/docs
* Access interactive documentation with Redoc: http://127.0.0.1:8000/redoc



## Notes:
* You can review Python basics in this notebook [Notebook](https://colab.research.google.com/drive/1FZrk1hRIQNxssTlZbkwKl_1EXTKhe3c9?usp=sharing).
* You can review notes (in Spanish) of courses in this [Notion](https://natural-daffodil-061.notion.site/Clases-del-Curso-de-FastAPI-Fundamentos-Path-Operations-y-Validaciones-e0b98d98569b49cdaf884dedf9f62454)
