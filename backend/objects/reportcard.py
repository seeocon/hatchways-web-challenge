from functools import reduce

class ReportCard:
    """
    ReportCard class
    """

    def __init__(self, student, marks, courses, tests):
        """
        Parameters
        ----------
        student : Student
            The student object for this report card.
        marks : List
            the list of marks, imported from Main
        courses : List
            the list of courses, imported from Main
        tests : List
            the list of tests, imported from Main
        """
        self.student = student
        self.marks = marks
        self.courses = courses
        self.tests = tests

    def formatPercentage(self, percentage):
        return "{0:.2f}".format(percentage)

    def createReportCard(self):
        # Get the marks only for this report card
        marks = []
        for mark in self.marks:
            if mark.student_id == self.student.getId():
                marks.append(mark)

        # Get the tests only for this report card
        tests = []
        for test in self.tests:
            for mark in marks:
                if test.id == mark.test_id:
                    tests.append(test)

        # Get the courses only for this report card
        courses = []
        for course in self.courses:
            for test in tests:
                if course.id == test.course_id:
                    courses.append(course)

        # Order the list of courses based on course id
        courses = sorted(list(set(courses)), key=lambda course: course.id)

        # Get the averages only for each course
        average = []
        for i, course in enumerate(courses):
            average.append(0)
            for test in tests:
                if course.id == test.course_id:
                    for mark in marks:
                        if test.id == mark.test_id:
                            average[i] += (int(test.weight)/100) * int(mark.mark) # weighted average
        totalAverage = reduce(lambda a, b: a + b, average) / len(average)
        totalString = '' # The string we will add to the output text file
        totalString += (f'Student Id: {self.student.id}, name: {self.student.name} \n')
        totalString += (f'Total Average:      {self.formatPercentage(totalAverage)}% \n')
        totalString += ('\n')
        for i,course in enumerate(courses):
            totalString += (f'        Course: {course.name}, Teacher: {course.teacher} \n')
            totalString += (f'        Final Grade:      {self.formatPercentage(average[i])}% \n')
            totalString += ('\n')
        return totalString
