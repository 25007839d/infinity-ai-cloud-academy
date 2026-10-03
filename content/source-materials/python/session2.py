# =====================================================
# PYTHON MODULE 2
# SET, DICTIONARY, OPERATORS, TYPE CONVERSION, IF
# =====================================================

# =====================================================
# SET
# =====================================================

print("\nSET")

data = {10,20,30,40}
print(data)

# add()
data.add(50)
print(data)

# update()
data.update([60,70])
print(data)

# remove()
data.remove(20)
print(data)

# discard()
data.discard(100)
print(data)

# pop()
removed = data.pop()
print("Removed:", removed)

# copy()
new_set = data.copy()
print(new_set)

# =====================================================
# SET OPERATIONS
# =====================================================

s1 = {10,20,30}
s2 = {20,30,40}

print("Union:", s1.union(s2))
print("Intersection:", s1.intersection(s2))
print("Difference:", s1.difference(s2))
print("Symmetric Difference:", s1.symmetric_difference(s2))
print("Subset:", {10,20}.issubset(s1))

# =====================================================
# DICTIONARY
# =====================================================

print("\nDICTIONARY")

emp = {
    "id":101,
    "name":"Rahul",
    "salary":50000
}

print(emp)

# get()
print(emp.get("name"))

# keys()
print(emp.keys())

# values()
print(emp.values())

# items()
print(emp.items())

# update()
emp.update({"city":"Delhi"})
print(emp)

# pop()
emp.pop("salary")
print(emp)

# setdefault()
emp.setdefault("country","India")
print(emp)

# copy()
new_emp = emp.copy()
print(new_emp)

# fromkeys()
keys = ["a","b","c"]
print(dict.fromkeys(keys,0))

# =====================================================
# ARITHMETIC OPERATORS
# =====================================================

a = 10
b = 3

print(a+b)
print(a-b)
print(a*b)
print(a/b)
print(a%b)
print(a**b)
print(a//b)

# =====================================================
# COMPARISON OPERATORS
# =====================================================

print(a>b)
print(a<b)
print(a>=b)
print(a<=b)
print(a==b)
print(a!=b)

# =====================================================
# LOGICAL OPERATORS
# =====================================================

print((10>5) and (5>2))
print((10>5) or (2>5))
print(not(10>5))

# =====================================================
# ASSIGNMENT OPERATORS
# =====================================================

x = 10

x += 5
print(x)

x -= 2
print(x)

x *= 2
print(x)

x /= 2
print(x)

# =====================================================
# BITWISE OPERATORS
# =====================================================

a = 10
b = 15

print(a & b)
print(a | b)
print(a ^ b)
print(~a)
print(a << 1)
print(a >> 1)

# =====================================================
# MEMBERSHIP OPERATORS
# =====================================================

data = [10,20,30]

print(20 in data)
print(100 not in data)

# =====================================================
# IDENTITY OPERATORS
# =====================================================

a = [10,20]
b = a
c = [10,20]

print(a is b)
print(a is c)

print(a is not c)

# =====================================================
# OPERATOR PRECEDENCE
# =====================================================

value = (1+1)*2**4//3+4-1

print(value)

# =====================================================
# IMPLICIT TYPE CONVERSION
# =====================================================

a = 5
b = 2

value = a/b

print(value)
print(type(value))

# =====================================================
# EXPLICIT TYPE CONVERSION
# =====================================================

print(int(10.5))
print(float(10))
print(str(100))
print(list("Python"))
print(tuple([1,2,3]))

print(bin(10))
print(oct(10))
print(hex(10))

# =====================================================
# OUTPUT
# =====================================================

print("Hello Python")

print("A","B","C",sep="-")

print("Hello",end=" ")
print("World")

# =====================================================
# INPUT
# =====================================================

# name = input("Enter Name:")
# print(name)

# age = int(input("Enter Age:"))
# print(age)

# =====================================================
# ESCAPE SEQUENCE
# =====================================================

print("Python\nSQL")

print("Python\tSQL")

print("D:\\Data")

print("\"Python\"")

# =====================================================
# COMMENTS
# =====================================================

# Single line comment

"""
Multi Line Comment
Line 1
Line 2
"""

# =====================================================
# IF
# =====================================================

age = 20

if age >= 18:
    print("Eligible")

# =====================================================
# IF ELSE
# =====================================================

age = 15

if age >= 18:
    print("Eligible")
else:
    print("Not Eligible")

# =====================================================
# NESTED IF
# =====================================================

age = 25
salary = 40000

if age >= 18:
    if salary >= 30000:
        print("Loan Approved")

# =====================================================
# IF WITH LOGICAL OPERATORS
# =====================================================

age = 25
salary = 50000

if age >= 18 and salary >= 30000:
    print("Eligible")

# =====================================================
# IF ELIF ELSE
# =====================================================

marks = 85

if marks >= 90:
    print("Grade A+")

elif marks >= 75:
    print("Grade A")

elif marks >= 60:
    print("Grade B")

else:
    print("Grade C")

# =====================================================
# DATA ENGINEERING EXAMPLE
# =====================================================

record = {
    "machine_id":"M001",
    "temperature":35.5,
    "location":"Delhi"
}

if record["temperature"] > 30:
    print("High Temperature Alert")

print("MODULE 2 COMPLETED")