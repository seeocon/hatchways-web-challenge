class Mark:

    #test id, student id, mark
    def __init__(self, test_id,student_id,mark):
        self.test_id = test_id
        self.student_id = student_id
        self.mark = mark

    def __str__(self):
        return self.test_id + " | " + self.student_id + " | " + self.mark

    def getId(self):
        return self.test_id

    def getStudentID(self):
        return self.student_id

    def getMark(self):
        return self.mark
