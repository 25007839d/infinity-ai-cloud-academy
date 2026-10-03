# 4. Indexing & Slicing
import numpy as np
arr = np.array([10,20,30,40,50])
print(arr[0])       # 10
print(arr[-1])      # 50
print(arr[1:4])     # [20 30 40]
mat = np.array([[1,2,3],
                 # 0 1 2
                [4,5,6]])


print(mat[0,2])     # 2
print(mat[:,2])     # column [2 5]
print(mat[0,:])     # row [4 5 6]

