#5. Mathematical Operations

import numpy as np
x = np.array([1,2,3])
y = np.array([4,5,6])

# same time performing by list
a = [1,2,3]
b = [4,5,6,4]

le1 = len(a)
le2 = len(b)

fin_len = 0

if le1>le2:
    fin_len = le1
elif le2>le1:
    fin_len = le2
else:
    fin_len = le1


n_li = []
for i in range(fin_len):

    n_li.append(a[i] + b[i])

print(n_li)
# print(a + b)


print(x + y)      # [5 7 9]
print(x - y)      # [-3 -3 -3]
print(x * y)      # [ 4 10 18]
print(x / y)      # [0.25 0.4 0.5 ]
print(np.power(x, 2))  # [1 4 9]
