import { Component, SyntheticEvent } from "react";
import { Formik, Form } from "formik";
import { connect } from "react-redux";
import { path, values } from "ramda";

import { readTasks, createTask, Task } from "ducks/tasks";

import styles from "./index.scss";

type PropsFromStore = {
  tasks: {
    byId: Array<Task>;
  };
};

type Actions = {
  readTasks: () => void;
  createTask: (payload: {
    what: string;
    why: string;
    how: string;
    when: string;
  }) => void;
};

type Props = Actions & PropsFromStore;

type State = {
  what: string;
  why: string;
  how: string;
  when: string;
};

const mapStateToProps = store => store;

const actions = { createTask, readTasks };

class Index extends Component<Props, State> {
  state = {
    what: "",
    why: "",
    how: "",
    when: ""
  };

  componentDidMount() {
    this.props.readTasks();
  }

  handleOnChange = (event: SyntheticEvent) => {
    const name: "what" | "why" | "how" | "when" = path(
      ["currentTarget", "name"],
      event
    );
    const value = path(["currentTarget", "value"], event);

    this.setState({
      [name]: value
    } as Pick<State, keyof State>);
  };

  handleOnSubmit = (event: SyntheticEvent) => {
    event.preventDefault();

    this.props.createTask(this.state);
  };

  render() {
    const { what, why, how, when } = this.state;
    console.log({ props: this.props, state: this.state });

    return (
      <div className={styles.view}>
        <form className={styles.form} onSubmit={this.handleOnSubmit}>
          <input
            type="text"
            placeholder="What"
            name="what"
            onChange={this.handleOnChange}
            value={what}
          />
          <input
            type="text"
            placeholder="Why"
            name="why"
            onChange={this.handleOnChange}
            value={why}
          />
          <input
            type="text"
            placeholder="How"
            name="how"
            onChange={this.handleOnChange}
            value={how}
          />
          <input
            type="date"
            placeholder="When"
            name="when"
            onChange={this.handleOnChange}
            value={when}
          />
          <input type="submit" value="Create Task" />
        </form>
        <ul className={styles.tasks}>
          {values(this.props.tasks.byId).map((task: Task) => (
            <li key={task.id}>
              {task.id} - {task.what}
            </li>
          ))}
        </ul>
        <Formik
          render={props => {
            const { errors, handleChange, isValid, values } = props;

            return (
              <Form className={styles.form}>
                <input
                  type="text"
                  placeholder="What"
                  name="what"
                  onChange={handleChange}
                  value={values.what}
                />
                <input
                  type="text"
                  placeholder="Why"
                  name="why"
                  onChange={handleChange}
                  value={values.why}
                />
                <input
                  type="text"
                  placeholder="How"
                  name="how"
                  onChange={handleChange}
                  value={values.how}
                />
                <input
                  type="date"
                  placeholder="When"
                  name="when"
                  onChange={handleChange}
                  value={values.when}
                />
                <input type="submit" value="Create Task" />
              </Form>
            );
          }}
        />
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  actions
)(Index);
