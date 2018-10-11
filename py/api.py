from flask import Flask,request,Response
import numpy
import pickle
import json

app=Flask(__name__)
@app.route("/load",methods=['POST'])
def load():
	
	try:
		r = request.json
		file_path=r['fp']
		with open(file_path,'rb') as f:
			f_pkl=pickle.load(f)
		response={'content':f_pkl}
		return Response(response=json.dumps(response), status=200, mimetype="application/json")
	except:
		return "error"





if __name__ == '__main__':
	app.run(debug=False,host='0.0.0.0')