class Test:

    #unique id, course id, course weight
    def __init__(self,id,course_id,weight):
        self.id = id
        self.course_id = course_id
        self.weight = weight

    def __str__(self):
        return self.id + " | " + self.course_id + " | " + self.weight

    def getId(self):
        return self.id

    def getCourseID(self):
        return self.course_id

    def getWeight(self):
        return self.weight
