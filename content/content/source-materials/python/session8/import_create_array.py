# 1. Importing NumPy
import numpy as np
# 2. Creating Arrays
a = np.array([1, 2, 3])                   # 1D array
b = np.array([[1, 2], [3, 4]])            # 2D array
zeros = np.zeros((2, 3))                  # array of zeros
ones = np.ones((2, 3))                    # array of ones
full = np.full((2, 2), 7)                 # array filled with 7
eye = np.eye(3)                           # identity matrix
arange = np.arange(0, 10, 2)              # range with step
linspace = np.linspace(0, 1, 5)           # equally spaced numbers

print(zeros)
print(ones)
print(eye)
print(arange)
print(linspace)
