# Capstone starter: define clear interfaces for extract/transform/load.
def extract(source):
    raise NotImplementedError

def transform(records):
    return records

def load(records, target):
    raise NotImplementedError

if __name__ == "__main__":
    print("Implement your production-style pipeline here.")
