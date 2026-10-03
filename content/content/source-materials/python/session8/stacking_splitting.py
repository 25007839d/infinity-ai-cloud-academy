# Stacking & Splitting


# NumPy provides various functions for both stacking (joining) and splitting arrays, allowing for
# flexible manipulation of data structures.
import numpy as np
a = np.array([[1,2],[3,4]])
b = np.array([[5,6],[7,8]])

print(np.hstack((a,b))) # horizontal stacking
# [[1 2 5 6]
#  [3 4 7 8]]

print(np.vstack((a,b))) # vertical stacking
# [[1 2]
#  [3 4]
#  [5 6]
#  [7 8]]

arr = np.array([1,2,3,4,5,6])
print(np.split(arr, 3))  # [array([1,2]), array([3,4]), array([5,6])]


