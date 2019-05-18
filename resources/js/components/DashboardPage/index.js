import React, { Component } from "react";
import TaskGroup from "./TaskGroup";

class DashboardPage extends Component {
    constructor(props) {
        super(props);

        this.state = { tasks: []}
    }

    async componentDidMount() {
        const container = document.querySelector('#dashboardpage');
        const userId = container.dataset.userId;
        const userName = container.dataset.userName;

        // Load async data.
        let tasks = await axios.get(`/api/user/${userId}/tasks`);

        // Parse the results for ease of use.
        tasks = tasks.data;

        this.setState({ tasks, userName });
    }

    handleAddTask() {
        console.log("handleAddTask");
    }

    render() {
        // console.log(this.state);
        // const { tasks } = state;
        // console.log("something", tasks);
        const fakeGroups = [
            {
                id: "header1",
                headerText: "Fake group header",
                canCollapse: true,
                tasks: this.state.tasks
            }
        ];

        return (
            <div>
                <div className="container text-center my-4">
                    <h3>Welcome, {this.state.userName}</h3>
                </div>
                {fakeGroups.map((group, idx) => (
                    <div className="container" key={idx}>
                        <div className="container">
                            <button type="button" className="btn btn-secondary" onClick={this.handleAddTask}>Add Task</button>
                        </div>
                        <TaskGroup
                            canCollapse={group.canCollapse}
                            headerText={group.headerText}
                            tasks={group.tasks}
                            groupId={group.id} // @TODO - can we just use key?
                        />
                    </div>
                ))}
            </div>
        );
    }
}

export default DashboardPage;
