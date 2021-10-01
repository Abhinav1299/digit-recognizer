from flask import Flask, render_template, request, redirect
# skimage  for performing operations on images (scientific computaional library)
from skimage.io import imread,imsave
from skimage.transform import resize
import numpy as np
import re # regular expressions
import sys
import os
import base64
import keras
sys.path.append(os.path.abspath('./model'))

app = Flask(__name__)
app.static_folder='static'

model = keras.models.load_model('./model/digit_rec_keras.h5')

def convertImage(image):
    imageData = base64.b64decode(image)
    with open('output.png','wb') as output:
        output.write(imageData)
        output.close()


@app.route('/')
def index():
    return render_template("index.html")

@app.route("/predict",methods=['GET','POST'])
def predict():
    image_b64=request.values[('imageBase64')]

    
    imgstr=re.search(r'data:image/png;base64,(.*)',image_b64).group(1)
    print(imgstr)
    output=open('output.png', 'wb')
    decoded=base64.b64decode(imgstr)
    output.write(decoded)
    output.close()
    x = imread('output.png',as_gray=True)

    x = resize(x,(28,28))

    for i in range(28):
        for j in range(28):
            x[i][j]=1-x[i][j]

    print()
    print()
    x = x.reshape(1,28,28,1)
    out = model.predict(x)
    print(out)
    response = np.array_str(np.argmax(out,axis=1))
    return response

if __name__=='__main__':
    app.run(debug=True)

