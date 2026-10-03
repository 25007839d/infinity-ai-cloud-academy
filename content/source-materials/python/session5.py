# =====================================================
# PYTHON MODULE 5
# MODULES, PACKAGES, ABSTRACT CLASS,
# DATETIME, MULTITHREADING
# =====================================================

# =====================================================
# MODULES
# =====================================================

print("\nMODULES")

import math

print(math.sqrt(25))
print(math.factorial(5))
print(math.pi)

# =====================================================
# IMPORT AS
# =====================================================

print("\nIMPORT AS")

import math as m

print(m.sqrt(36))

# =====================================================
# FROM IMPORT
# =====================================================

print("\nFROM IMPORT")

from math import sqrt

print(sqrt(49))

# =====================================================
# MULTIPLE IMPORT
# =====================================================

print("\nMULTIPLE IMPORT")

from math import sqrt,factorial

print(sqrt(64))
print(factorial(6))

# =====================================================
# USER DEFINED MODULE
# =====================================================

print("\nUSER DEFINED MODULE")

"""
calculator.py

def add(a,b):
    return a+b

def sub(a,b):
    return a-b


main.py

import calculator

print(calculator.add(10,20))
"""

print("User Defined Module Example")


# =====================================================
# IMPORT *
# =====================================================

print("\nIMPORT STAR")

"""
from calculator import *

print(add(10,20))
print(sub(20,10))
"""

print("Import * Example")


# =====================================================
# PACKAGE STRUCTURE
# =====================================================

print("\nPACKAGE")

"""
project/

    __init__.py

    admin/

        __init__.py

        service.py

    user/

        __init__.py

        profile.py
"""

print("Package Example")


# =====================================================
# PACKAGE IMPORT
# =====================================================

print("\nPACKAGE IMPORT")

"""
from admin.service import login

login()
"""

print("Package Import Example")


# =====================================================
# __all__
# =====================================================

print("\n__all__")

"""
__all__ = [
    "service",
    "dashboard"
]
"""

print("__all__ Example")


# =====================================================
# ABSTRACT CLASS
# =====================================================

print("\nABSTRACT CLASS")

from abc import ABC, abstractmethod

class Vehicle(ABC):

    @abstractmethod
    def start(self):
        pass

# Vehicle()   # Error


# =====================================================
# ABSTRACT METHOD
# =====================================================

print("\nABSTRACT METHOD")

class Vehicle(ABC):

    @abstractmethod
    def start(self):
        pass

    def fuel(self):
        print("Fuel Required")

class Car(Vehicle):

    def start(self):
        print("Car Started")

c = Car()

c.start()

c.fuel()


# =====================================================
# INTERFACE CONCEPT
# =====================================================

print("\nINTERFACE")

class Defence(ABC):

    @abstractmethod
    def gun(self):
        pass

    @abstractmethod
    def area(self):
        pass

class Army(Defence):

    def gun(self):
        print("AK47")

    def area(self):
        print("Land")

class Navy(Defence):

    def gun(self):
        print("AK48")

    def area(self):
        print("Sea")

Army().gun()
Navy().area()


# =====================================================
# DATE TIME MODULE
# =====================================================

print("\nDATE TIME")

from datetime import datetime

current = datetime.now()

print(current)


# =====================================================
# CURRENT DATE
# =====================================================

print("\nCURRENT DATE")

print(datetime.now().date())


# =====================================================
# CURRENT TIME
# =====================================================

print("\nCURRENT TIME")

print(datetime.now().time())


# =====================================================
# YEAR MONTH DAY
# =====================================================

print("\nYEAR MONTH DAY")

dt = datetime.now()

print(dt.year)
print(dt.month)
print(dt.day)


# =====================================================
# HOUR MINUTE SECOND
# =====================================================

print("\nTIME PARTS")

print(dt.hour)
print(dt.minute)
print(dt.second)


# =====================================================
# STRFTIME
# =====================================================

print("\nSTRFTIME")

print(dt.strftime("%d-%m-%Y"))

print(dt.strftime("%d/%m/%Y"))

print(dt.strftime("%B"))

print(dt.strftime("%A"))

print(dt.strftime("%H:%M:%S"))


# =====================================================
# FORMAT CODES
# =====================================================

print("\nFORMAT CODES")

print(dt.strftime("%a"))

print(dt.strftime("%A"))

print(dt.strftime("%b"))

print(dt.strftime("%B"))

print(dt.strftime("%Y"))

print(dt.strftime("%m"))

print(dt.strftime("%d"))


# =====================================================
# TIMESTAMP
# =====================================================

print("\nTIMESTAMP")

print(datetime.timestamp(dt))


# =====================================================
# TIME MODULE
# =====================================================

print("\nTIME MODULE")

import time

print(time.time())

print(time.ctime())


# =====================================================
# SLEEP
# =====================================================

print("\nSLEEP")

print("Start")

time.sleep(2)

print("End")


# =====================================================
# TIME DELTA
# =====================================================

print("\nTIMEDELTA")

from datetime import timedelta

future = datetime.now() + timedelta(days=5)

print(future)


# =====================================================
# REMINDER EXAMPLE
# =====================================================

print("\nREMINDER")

reminder = datetime.now() + timedelta(seconds=3)

print(reminder.strftime("%H:%M:%S"))

print("Reminder Example Created")


# =====================================================
# MULTITASKING
# =====================================================

print("\nMULTITASKING")

print("Running Multiple Tasks")


# =====================================================
# MAIN THREAD
# =====================================================

print("\nMAIN THREAD")

import threading

print(threading.current_thread().name)


# =====================================================
# SIMPLE THREAD
# =====================================================

print("\nTHREAD")

def display():

    print("Thread Executed")

t = threading.Thread(target=display)

t.start()

t.join()


# =====================================================
# MULTIPLE THREADS
# =====================================================

print("\nMULTIPLE THREADS")

def task1():
    print("Task 1")

def task2():
    print("Task 2")

t1 = threading.Thread(target=task1)

t2 = threading.Thread(target=task2)

t1.start()

t2.start()

t1.join()

t2.join()


# =====================================================
# THREAD WITH ARGUMENTS
# =====================================================

print("\nTHREAD ARGUMENTS")

def square(n):

    print(n*n)

t = threading.Thread(
    target=square,
    args=(10,)
)

t.start()

t.join()


# =====================================================
# FILE DOWNLOAD EXAMPLE
# =====================================================

print("\nDOWNLOAD EXAMPLE")

def download_file(file_name, delay):

    print(f"Downloading {file_name}")

    time.sleep(delay)

    print(f"Completed {file_name}")

t1 = threading.Thread(
    target=download_file,
    args=("file1.csv",2)
)

t2 = threading.Thread(
    target=download_file,
    args=("file2.json",3)
)

t1.start()
t2.start()

t1.join()
t2.join()

print("All Downloads Completed")


# =====================================================
# DATA ENGINEERING EXAMPLE
# =====================================================

print("\nDATA ENGINEERING EXAMPLE")

from datetime import datetime

file_name = "sensor_data.csv"

load_time = datetime.now()

print(file_name)

print(
    load_time.strftime(
        "%Y-%m-%d %H:%M:%S"
    )
)

print("Data Loaded Successfully")


# =====================================================
# MULTITHREADING ETL EXAMPLE
# =====================================================

print("\nMULTITHREADING ETL")

def process_file(file):

    print(f"Processing {file}")

files = [
    "sensor_1.csv",
    "sensor_2.csv",
    "sensor_3.csv"
]

threads = []

for file in files:

    t = threading.Thread(
        target=process_file,
        args=(file,)
    )

    threads.append(t)

    t.start()

for t in threads:

    t.join()

print("ETL Completed")


# =====================================================
# END OF MODULE 5
# =====================================================

print("\nMODULE 5 COMPLETED")