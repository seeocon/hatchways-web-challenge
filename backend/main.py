import csv
import time
from objects.course import Course
from objects.mark import Mark
from objects.student import Student
from objects.test import Test
from objects.reportcard import ReportCard

# python 3

def openFile(location, col):
    fileContents = []
    with open(location) as file: #id,name,teacher
        csvReader = csv.reader(file, delimiter=',')
        lc = 0 # line count
        for row in csvReader:
            if lc > 0: # first line is the column names
                if col > 2:
                    if "courses" in location:
                        fileContents.append(Course(row[0],row[1],row[2]))
                    elif "marks" in location:
                        fileContents.append(Mark(row[0],row[1],row[2]))
                    elif "tests" in location:
                        fileContents.append(Test(row[0],row[1],row[2]))
                else:
                    fileContents.append(Student(row[0],row[1]))
            lc += 1
    return fileContents

def main():
    courses = openFile('./input/courses.csv',3)
    marks = openFile('./input/marks.csv',3)
    students = openFile('./input/students.csv', 2)
    tests = openFile('./input/tests.csv', 3)
    reportcards = []

    for student in students:
        reportcards.append(ReportCard(student, marks, courses, tests))

    lines = ''
    for reportcard in reportcards:
        lines += reportcard.createReportCard()
    f = open('./output/' + str(time.time()) + '.txt',"w") # Unix Epoch Time, timestamps in databases.
    f.write(lines)
    f.close()



if __name__ == "__main__": main()
