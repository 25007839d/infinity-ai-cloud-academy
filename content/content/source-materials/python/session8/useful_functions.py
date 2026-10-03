# Useful Functions

import numpy as np
arr = np.array([1,2,3,3,4,5,4,5,6])
# print(np.unique(arr))           # unique values
# print(np.sort(arr))             # sort
# print(np.where(arr>3))          # indices where condition holds
print(np.clip(arr, 2, 4))       # limit values [2 2 3 4 4] (arry, min, max)
print(np.argmax(arr))           # index of max → 4
print(np.argmin(arr))           # index of min → 0

