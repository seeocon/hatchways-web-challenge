class Course:

    # Initializer / Instance Attributes
    #unique id, course name, teacher name
    def __init__(self, id, name, teacher):
        self.id = id
        self.name = name
        self.teacher = teacher

    def __str__(self):
        return self.id + " | " + self.name + " | " + self.teacher

    def getId(self):
        return self.id

    def getName(self):
        return self.name

    def getTeacher(self):
        return self.teacher
