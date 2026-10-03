# =====================================================
# PYTHON MODULE 1
# PYTHON FUNDAMENTALS
# =====================================================

print("\n==============================")
print("INTRODUCTION TO PYTHON")
print("==============================")

print("Hello Python")
print("Welcome to Data Engineering")


# =====================================================
# IDENTIFIERS
# =====================================================

print("\nIDENTIFIERS")

name = "Dushyant"
full_name = "Dushyant Kumar"
city_1 = "Delhi"

print(name)
print(full_name)
print(city_1)

# Invalid Examples
# 1name = "abc"
# class = "python"
# full name = "abc"


# =====================================================
# VARIABLES
# =====================================================

print("\nVARIABLES")

a = 10
b = 20

print(a)
print(b)

a = 50

print(a)


# =====================================================
# CONSTANTS
# =====================================================

print("\nCONSTANTS")

PI = 3.14159
MAX_SIZE = 100

print(PI)
print(MAX_SIZE)


# =====================================================
# TYPE FUNCTION
# =====================================================

print("\nTYPE FUNCTION")

a = 10
b = 10.5
c = "Python"

print(type(a))
print(type(b))
print(type(c))


# =====================================================
# NONE TYPE
# =====================================================

print("\nNONE TYPE")

x = None

print(x)
print(type(x))


# =====================================================
# INTEGER
# =====================================================

print("\nINTEGER")

age = 30

print(age)
print(type(age))


# =====================================================
# FLOAT
# =====================================================

print("\nFLOAT")

salary = 25000.50

print(salary)
print(type(salary))


# =====================================================
# SCIENTIFIC NOTATION
# =====================================================

print("\nSCIENTIFIC NOTATION")

value = 5.1e5

print(value)


# =====================================================
# COMPLEX NUMBER
# =====================================================

print("\nCOMPLEX NUMBER")

z = 5 + 7j

print(z)
print(type(z))

print(z.real)
print(z.imag)

print(z.conjugate())

print(abs(z))


# =====================================================
# BOOLEAN
# =====================================================

print("\nBOOLEAN")

x = 5 > 2

print(x)
print(type(x))

print(True + True)
print(True - False)
print(True * 5)


# =====================================================
# STRING
# =====================================================

print("\nSTRING")

s = "Data Engineering"

print(s)

print(s.upper())

print(s.lower())

print(s.title())

print(s.capitalize())

print(s.replace("Engineering", "Science"))

print(s.find("Data"))

print(s.count("e"))

print(s.startswith("Data"))

print(s.endswith("ing"))

print(len(s))


# =====================================================
# STRIP
# =====================================================

print("\nSTRIP")

s = "   Python   "

print(s.strip())

print(s.lstrip())

print(s.rstrip())


# =====================================================
# SPLIT
# =====================================================

print("\nSPLIT")

skills = "Python,SQL,AI"

print(skills.split(","))


# =====================================================
# JOIN
# =====================================================

print("\nJOIN")

data = ["Python", "SQL", "AI"]

print("-".join(data))


# =====================================================
# MEMBERSHIP
# =====================================================

print("\nMEMBERSHIP")

text = "Hello Python"

print("Python" in text)

print("Java" in text)


# =====================================================
# LIST
# =====================================================

print("\nLIST")

data = [10,20,30,40]

print(data)

data.append(50)

print(data)

data.extend([60,70])

print(data)

data.insert(1,100)

print(data)

data.remove(20)

print(data)

data.pop()

print(data)

print(data.index(100))

print(data.count(30))

data.sort()

print(data)

data.reverse()

print(data)

copy_list = data.copy()

print(copy_list)


# =====================================================
# TUPLE
# =====================================================

print("\nTUPLE")

data = (10,20,20,30)

print(data)

print(data.count(20))

print(data.index(30))


# =====================================================
# RANGE
# =====================================================

print("\nRANGE")

r = range(5)

print(list(r))

r = range(10,20,2)

print(list(r))

print(len(r))

print(12 in r)

print(21 in r)

print(r.start)

print(r.stop)

print(r.step)


# =====================================================
# DATA ENGINEERING EXAMPLE
# =====================================================

print("\nDATA ENGINEERING EXAMPLE")

machine_id = "M001"
location = "Delhi"
temperature = 35.5

print(machine_id)
print(location)
print(temperature)

record = {
    "machine_id": machine_id,
    "location": location,
    "temperature": temperature
}

print(record)

print(type(record))


# =====================================================
# END OF MODULE 1
# =====================================================

print("\nMODULE 1 COMPLETED")