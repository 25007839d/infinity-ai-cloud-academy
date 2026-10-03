# =====================================================
# PYTHON MODULE 3
# LOOPS, COMPREHENSIONS & PACKAGES
# =====================================================

# =====================================================
# WHILE LOOP
# =====================================================

print("\nWHILE LOOP")

i = 1

while i <= 5:
    print(i)
    i += 1


# =====================================================
# WHILE LOOP WITH ELSE
# =====================================================

print("\nWHILE ELSE")

i = 1

while i <= 3:
    print(i)
    i += 1
else:
    print("Loop Completed")


# =====================================================
# INFINITE LOOP WITH BREAK
# =====================================================

print("\nINFINITE LOOP")

i = 1

while True:

    print(i)

    if i == 5:
        break

    i += 1


# =====================================================
# NESTED WHILE LOOP
# =====================================================

print("\nNESTED WHILE")

i = 1

while i <= 3:

    j = 1

    while j <= 3:
        print(i, j)
        j += 1

    i += 1


# =====================================================
# RANGE FUNCTION
# =====================================================

print("\nRANGE")

print(list(range(10)))

print(list(range(1,10)))

print(list(range(1,10,2)))

print(list(range(10,0,-1)))

print(list(range(-1,-10,-2)))


# =====================================================
# FOR LOOP
# =====================================================

print("\nFOR LOOP")

for i in range(5):
    print(i)


# =====================================================
# FOR LOOP WITH STRING
# =====================================================

print("\nFOR STRING")

for ch in "Python":
    print(ch)


# =====================================================
# FOR LOOP WITH LIST
# =====================================================

print("\nFOR LIST")

data = [10,20,30,40]

for value in data:
    print(value)


# =====================================================
# FOR LOOP WITH ELSE
# =====================================================

print("\nFOR ELSE")

for i in range(5):
    print(i)
else:
    print("Loop Finished")


# =====================================================
# NESTED FOR LOOP
# =====================================================

print("\nNESTED FOR")

for i in range(1,4):

    for j in range(1,4):

        print(i,j)


# =====================================================
# STAR PATTERN
# =====================================================

print("\nPATTERN")

for i in range(1,6):

    for j in range(i):

        print("*",end=" ")

    print()


# =====================================================
# BREAK
# =====================================================

print("\nBREAK")

for i in range(10):

    if i == 5:
        break

    print(i)


# =====================================================
# CONTINUE
# =====================================================

print("\nCONTINUE")

for i in range(10):

    if i == 5:
        continue

    print(i)


# =====================================================
# PASS
# =====================================================

print("\nPASS")

for i in range(5):

    if i == 3:
        pass

    print(i)


# =====================================================
# LIST OF TUPLES
# =====================================================

print("\nLIST OF TUPLES")

students = [
    ("Alice",23,"Math"),
    ("Bob",21,"Physics"),
    ("Charlie",22,"Computer Science")
]

for name, age, subject in students:

    print(
        f"{name} studies {subject} and is {age} years old."
    )


# =====================================================
# TUPLE OF LISTS
# =====================================================

print("\nTUPLE OF LISTS")

sales = (
    [200,220,250],
    [180,210,230],
    [300,280,320]
)

totals = []

for week in sales:

    totals.append(sum(week))

print(totals)


# =====================================================
# NESTED DICTIONARY
# =====================================================

print("\nNESTED DICTIONARY")

company = {

    "HR": {
        "employees":["Alice","Bob"],
        "manager":"Sarah"
    },

    "IT": {
        "employees":["Charlie","David"],
        "manager":"John"
    }
}

print(company["IT"]["employees"])

print(company["IT"]["manager"])


# =====================================================
# LIST COMPREHENSION
# =====================================================

print("\nLIST COMPREHENSION")

squares = [x*x for x in range(5)]

print(squares)

even_squares = [
    x*x
    for x in range(10)
    if x % 2 == 0
]

print(even_squares)


# =====================================================
# SET COMPREHENSION
# =====================================================

print("\nSET COMPREHENSION")

nums = [1,2,2,3,4,4,5]

unique_squares = {
    x*x
    for x in nums
}

print(unique_squares)


# =====================================================
# DICTIONARY COMPREHENSION
# =====================================================

print("\nDICTIONARY COMPREHENSION")

squares = {
    x : x*x
    for x in range(5)
}

print(squares)

even_squares = {
    x : x*x
    for x in range(10)
    if x % 2 == 0
}

print(even_squares)


# =====================================================
# GENERATOR COMPREHENSION
# =====================================================

print("\nGENERATOR COMPREHENSION")

gen = (
    x*x
    for x in range(5)
)

print(next(gen))
print(next(gen))

print(list(gen))


# =====================================================
# PACKAGE EXAMPLE
# =====================================================

print("\nPACKAGE")

"""
mypackage/

    __init__.py

    math_utils.py

        def add(a,b):
            return a+b

main.py

from mypackage.math_utils import add

print(add(10,20))
"""

print("Package Example Explained")


# =====================================================
# DATA ENGINEERING EXAMPLES
# =====================================================

print("\nDATA ENGINEERING EXAMPLES")

sensor_data = [

    ("M001",35.5),

    ("M002",42.1),

    ("M003",38.2)

]

for machine_id, temp in sensor_data:

    if temp > 40:

        print(
            f"ALERT : {machine_id} Temperature = {temp}"
        )


# =====================================================
# LIST COMPREHENSION ETL
# =====================================================

temperatures = [35.5,42.1,38.2,45.8]

high_temp = [
    t
    for t in temperatures
    if t > 40
]

print(high_temp)


# =====================================================
# NESTED DICTIONARY ETL
# =====================================================

machines = {

    "M001": {
        "location":"Delhi",
        "temperature":35.5
    },

    "M002": {
        "location":"Mumbai",
        "temperature":42.1
    }
}

print(machines["M002"]["temperature"])


# =====================================================
# END OF MODULE 3
# =====================================================

print("\nMODULE 3 COMPLETED")