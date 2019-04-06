import React, { Component } from "react";

import styles from "./styles.module.css";

// https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce

class Student extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showExtra: false,
      tagText: "",
      tags: []
    };
  }

  toggleExpandableView() {
    var { showExtra } = this.state;
    this.setState({
      showExtra: !showExtra
    });
  }

  addNewTag = e => {
    var { updateStudentTags, studentid } = this.props;
    var { tagText, tags } = this.state;
    if (e.key === "Enter") {
      this.setState(
        { tags: [...tags, tagText] },
        updateStudentTags(tags, tagText, studentid)
      );
      this.setState({ tagText: "" });
    }
  };

  updateTagText = e => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    var { student } = this.props;
    var { showExtra, tagText, tags } = this.state;
    var renderTests = student.grades.map((item, i) => {
      return (
        <p key={i}>
          Test {i + 1}: {item}%
        </p>
      );
    });
    if (student.tags !== undefined) {
      var renderTags = student.tags.map((item, i) => {
        return <p key={i}>{item}</p>;
      });
    }
    return (
      <div className={styles.studentContainer}>
        <img
          className={styles.studentImage}
          src={student.pic}
          alt="student profile"
        />
        <div className={styles.studentInformationContainer}>
          <h2 className={styles.studentNameText}>
            {student.firstName.toUpperCase()} {student.lastName.toUpperCase()}
          </h2>
          <p className={styles.studentEmailText}>Email: {student.email}</p>
          <p className={styles.studentCompanyText}>
            Company: {student.company}
          </p>
          <p className={styles.studentSkillText}>Skill: {student.skill}</p>
          <p className={styles.studentAverageText}>
            Average:{" "}
            {student.grades.reduce((p, c, _, a) => p + c / a.length, 0)}
          </p>
          <div
            className={styles.expandableView}
            style={{ display: showExtra ? "flex" : "none" }}
          >
            {renderTests}
            <div className={styles.tags}>{renderTags}</div>
            <input
              type="text"
              name="tagText"
              value={tagText}
              onChange={e => this.updateTagText(e)}
              onKeyPress={this.addNewTag}
              placeholder="Add a tag"
            />
          </div>
        </div>
        <div
          className={styles.expand}
          onClick={() => this.toggleExpandableView()}
        >
          <p>{showExtra ? "-" : "+"}</p>
        </div>
      </div>
    );
  }
}

export default Student;
