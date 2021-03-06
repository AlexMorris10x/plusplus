import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faCalendarAlt,
  faTrash,
  faTrashAlt
} from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

function Projects(props: any): any {
  const [state, setState] = useState({
    projectText: ""
  });

  const writeText = (e: any) => {
    e.preventDefault();
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
  };

  // submit project and reset form
  const submitAddProject = (e: any, projectText: string) => {
    e.preventDefault();
    props.addProject(e, projectText);
    setState({ ...state, projectText: "" });
  };

  return (
    <ComponentWrapper>
      <HomeWrapper>
        <Link to="/">
          <FontAwesomeIcon icon={faHome} />
          <div>Home</div>
        </Link>
      </HomeWrapper>
      {/* <UpcomingWrapper>
        <Link to="/">
          <FontAwesomeIcon icon={faCalendarAlt} />
          <div>Upcoming</div>
        </Link>
      </UpcomingWrapper>
      <TrashWrapper>
        <Link to="/">
          <FontAwesomeIcon icon={faTrash} />
          <div>Trash</div>
        </Link>
      </TrashWrapper> */}
      <BreakWrapper></BreakWrapper>
      <FormWrapper
        onSubmit={(e: any) => submitAddProject(e, state.projectText)}
      >
        <input
          placeholder="New project name..."
          type="text"
          name="projectText"
          value={state.projectText}
          onChange={e => writeText(e)}
        />
        <AddProjectButton>Add Project</AddProjectButton>
      </FormWrapper>
      {displayProjects(props)}
    </ComponentWrapper>
  );
}

const displayProjects = (props: any) => {
  return (
    <DragDropContext
      onDragEnd={projectLocation => props.moveProject(projectLocation)}
    >
      <Droppable droppableId={"projectBoard"} key={"projectBoard"}>
        {(provieded, snapshot) => {
          return (
            <AllProjectsWrapper
              {...provieded.droppableProps}
              ref={provieded.innerRef}
              style={{
                background: snapshot.isDraggingOver ? "lightblue" : "#F9FAFB",
                paddingBottom: snapshot.isDraggingOver ? 80 : 0
              }}
            >
              <ListNameWrapper>Projects</ListNameWrapper>
              {props.projects.map(
                (project: { _id: string; text: string }, index: number) => {
                  return (
                    <Draggable
                      key={project._id}
                      draggableId={project._id}
                      index={index}
                    >
                      {(provided, snapshot) => {
                        return (
                          <Link to={`${project._id}`}>
                            <ProjectWrapper
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <ProjectTextWrapper>
                                {project.text}
                              </ProjectTextWrapper>
                              <DeleteProjectButton
                                onClick={() => props.deleteProject(project._id)}
                              >
                                <FontAwesomeIcon icon={faTrashAlt} />
                              </DeleteProjectButton>
                            </ProjectWrapper>
                          </Link>
                        );
                      }}
                    </Draggable>
                  );
                }
              )}
            </AllProjectsWrapper>
          );
        }}
      </Droppable>
    </DragDropContext>
  );
};

export default Projects;

const ComponentWrapper = styled.div`
  margin: 40px 0;
`;

const HomeWrapper = styled.div`
  margin: 10px 40px;
  min-width: 100px;
  font-size: 1.2em;
  border-radius: 8px;
  &:hover {
    background: #e9ebee;
  }
  > a {
    display: flex;
    color: #1d2129;
    text-decoration: none;
    > svg {
      color: #4065b4;
    }
  }
`;

const UpcomingWrapper = styled.div`
  margin: 10px 40px;
  min-width: 100px;
  font-size: 1.2em;
  border-radius: 8px;
  &:hover {
    background: #e9ebee;
  }
  > a {
    display: flex;
    color: #1d2129;
    text-decoration: none;
    > svg {
      color: #f22664;
    }
  }
`;

const TrashWrapper = styled.div`
  margin: 10px 40px;
  min-width: 100px;
  font-size: 1.2em;
  border-radius: 8px;
  &:hover {
    background: #e9ebee;
  }
  > a {
    display: flex;
    color: #1d2129;
    text-decoration: none;
    > svg {
      color: #c3c8cc;
    }
  }
`;

const BreakWrapper = styled.div`
  margin: 40px;
  border: 1px solid black;
`;

const FormWrapper = styled.form`
  margin: 40px auto;
  > input {
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
  }
`;

const AddProjectButton = styled.button`
  margin: 0;
  font-size: 0.8em;
  color: white;
  background: #4065b4;
  border: 2px solid black;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
`;

const ListNameWrapper = styled.p`
  margin: auto;
  padding: 10px;
  font-size: 2em;
`;

const AllProjectsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 30px auto;
  max-width: 300px;
  width: 30vw;
  @media (max-width: 600px) {
    width: 60vw;
  }
  border: 2px solid black;
  border-radius: 10px;
`;

const ProjectWrapper = styled.div`
  display: flex;
  margin: auto

  background: #e9ebee;
  border-top: 1px solid black;
  border-bottom: 1px solid black;
  border-radius: 8px;
  &:hover {
    background: #e9ebee;
    border-radius: 8px;
  }
  > a {
    text-decoration: none;
    font-size: 1.2em;
    color: #1d2129;
  }

`;

const ProjectTextWrapper = styled.div`
  margin: 20px 0 20px 30px;
  padding: 10px;
  width: 40vw;
`;

const DeleteProjectButton = styled.div`
  margin: auto;
  padding: 6px;
  width: min-content;
  font-size: 1em;
  color: red;
  background: white;
  border: 1.5px solid black;
  border-radius: 8px;
`;
