# Reshaping

import numpy as np
arr = np.arange(1,7)     # [1 2 3 4 5 6]
reshaped = arr.reshape(2,3)
print(reshaped)
# [[1 2 3]
#  [4 5 6]]

flat = reshaped.ravel()  # back to 1D
print(flat)

