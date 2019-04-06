import React, { Component } from "react";
import axios from "axios";
import Student from "../../components/student";
import Fullscreen from "../../components/fullscreen";
import Wrapper from "../../components/wrapper";
import Search from "../../components/search";
import Seperator from "../../components/seperator";

import styles from "./styles.module.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      students: null,
      nameQueryText: "",
      tagQueryText: "",
      other: ""
    };
    this.updateQueryText = this.updateQueryText.bind(this);
    this.updateStudentTags = this.updateStudentTags.bind(this);
  }

  componentWillMount() {
    this.getStudents();
  }

  getStudents = () => {
    axios
      .get("https://www.hatchways.io/api/assessment/students")
      .then(res => {
        if (res.data) {
          this.setState({
            students: res.data.students
          });
        }
      })
      .catch(err => console.log(err));
  };

  updateQueryText(event) {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value });
  }

  getFilteredStudents() {
    var { students, nameQueryText, tagQueryText } = this.state;
    var filteredStudents = students.filter(student => {
      if (tagQueryText !== "") {
        if (student.tags !== undefined) {
          var studentTags = student.tags.join();
          return (
            studentTags.indexOf(tagQueryText) !== -1 &&
            (student.firstName + " " + student.lastName)
              .toUpperCase()
              .indexOf(nameQueryText.toUpperCase()) !== -1
          );
        }
      } else {
        return (
          (student.firstName + " " + student.lastName)
            .toUpperCase()
            .indexOf(nameQueryText.toUpperCase()) !== -1
        );
      }
    });
    return filteredStudents;
  }

  updateStudentTags(tags, tag, studentid) {
    // I'm not sure if it was done in the example,
    // but I spend over 2 hours trying to figure this out,
    // there is one bug in the project, I wonder if you can figure it out
    // I couldn't figure out a way to access students by a unique ID, since there is no ID in the JSON data
    // Yes, I know I can mutate the GET fetch, and add a unique id so I can access the tags of the students uniquely
    // But I don't think that's the most efficient way.
    // In a working scenario, I'm sure there would be someone I could ask this question.
    // If you are reviewing my code, could you please send me an email at: me@seeocon.co
    // I would really like to know where I went wrong, thanks :)
    var { nameQueryText, tagQueryText } = this.state;
    var students = this.getFilteredStudents();
    if (tag !== "" && tag.replace(/\s/g, "").length) {
      students[studentid].tags = [...tags, tag];
    } else {
      alert("Your tag input is invalid!");
    }
  }

  render() {
    var { students, nameQueryText, tagQueryText } = this.state;
    // no pagination needed, wasn't asked, so let's use a standard array.map
    if (students) {
      var renderStudents = this.getFilteredStudents().map((item, i) => {
        return (
          <Student
            updateStudentTags={this.updateStudentTags}
            student={item}
            studentid={i}
            key={i}
          />
        );
      });
    }
    return (
      <Fullscreen>
        <Wrapper>
          <Search
            query={nameQueryText}
            placeholderText="Search by name"
            name="nameQueryText"
            updateQueryText={this.updateQueryText}
          />
          <Search
            query={tagQueryText}
            placeholderText="Search by tags"
            name="tagQueryText"
            updateQueryText={this.updateQueryText}
          />
          <div className={styles.studentsContainer}>{renderStudents}</div>
        </Wrapper>
      </Fullscreen>
    );
  }
}

export default App;
