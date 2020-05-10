from flask import Flask, render_template, request, redirect
# skimage  for performing operations on images (scientific computaional library)
from skimage.io import imread,imsave
from skimage.transform import resize
import numpy as np
from tensorflow import keras
import re # regular expressions
import sys
import os
import base64
sys.path.append(os.path.abspath('./model'))
# from load import *

app = Flask(__name__)
app.static_folder='static'
# global model,graph
# model graph = init()
model = keras.models.load_model('./model/digit_rec.h5')

# def convertImage(imgData1):
#     imgstr = re.search(r'base64,(.*)',imgData1).group(1)
#     with open('output.png', 'wb') as output:
#         output.write(imgstr.decode('base64'))

# def decode_base64(data, altchars=b'+/'):
#     """Decode base64, padding being optional.

#     :param data: Base64 data as an ASCII byte string
#     :returns: The decoded byte string.

#     """
#     data = re.sub(rb'[^a-zA-Z0-9%s]+' % altchars, b'', data)  # normalize
#     missing_padding = len(data) % 4
#     if missing_padding:
#         data += b'='* (4 - missing_padding)
#     return base64.b64decode(data, altchars)

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
    # imgData = request.values[('image64')]
    image_b64=request.values[('imageBase64')]
    print()
    print()
    # print(image_b64)
    print()
    print()
    # convertImage(imgData)

    
    imgstr=re.search(r'data:image/png;base64,(.*)',image_b64).group(1)
    print(imgstr)
    output=open('output.png', 'wb')
    decoded=base64.b64decode(imgstr)
    output.write(decoded)
    output.close()


    x = imread('output.png',as_gray=True)
    
    # x = np.invert(x)
    x = resize(x,(28,28))

    for i in range(28):
        for j in range(28):
            x[i][j]=1-x[i][j]
    # print(x)
    print()
    print()
    x = x.reshape(1,28,28,1)
    # with graph.as_default():
    #     out = model.predict(x)
    #     response = np.array_str(np.arg_max(out))
    #     return response
    out = model.predict(x)
    print(out)
    response = np.array_str(np.argmax(out,axis=1))
    return response


if __name__=='__main__':
    app.run(debug=True)

