class Student:

    #unique id, student name
    def __init__(self,id,name):
        self.id = id
        self.name = name

    def __str__(self):
        return self.id + " | " + self.name

    def getId(self):
        return self.id

    def getName(self):
        return self.name
