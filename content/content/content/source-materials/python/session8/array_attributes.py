#3. Array Attributes
import numpy as np

arr = np.array([[1,2,3],[4,5,6]])
print(arr.shape)   # (2,3)
print(arr.ndim)    # 2
print(arr.size)    # 6
print(arr.dtype)   # int64 (depends on system)
print(arr.itemsize) # bytes per element
