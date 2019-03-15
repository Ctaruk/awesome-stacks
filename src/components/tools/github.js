import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Card from "./card"

function GitHub({ name, data, children }) {
  const github = getNode(name, data)
  if (!github) {
    return <Card color="danger">{name} not found</Card>
  }
  return (
    <Card description={children}>
      <div className="is-top">
        <a href={github.url}>
          <FontAwesomeIcon icon={["fab", "github"]} size="5x" color="#8E9FA9" />
        </a>
        <div className="is-size-5 has-margin-top-10">
          <a href={github.url}>{github.name}</a>
        </div>
      </div>
      <div className="is-size-7 has-margin-top-5 is-middle" dangerouslySetInnerHTML={{ __html: github.descriptionHTML }} />
      <div className="level is-mobile is-bottom has-overflow-hidden">
        <div className="level-item has-text-left">
          <div>
            <a className="has-text-grey" href={`${github.url}/stargazers`}>
              <FontAwesomeIcon icon="star" fixedWidth />{" "}
              <span>{github.stargazers.totalCount}</span>
            </a>
            <div />
            <a className="has-text-grey" href={`${github.url}/network/members`}>
              <FontAwesomeIcon icon="code-branch" fixedWidth />{" "}
              <span>{github.forks.totalCount}</span>
            </a>
          </div>
        </div>
        {github.repositoryTopics.edges.length > 0 ? (
          <div className="level-item has-text-right">
            <div>
              {github.repositoryTopics.edges.map(edge => (
                <div key={edge.node.topic.name}>
                  <a className="tag" href={edge.node.url}>
                    #{edge.node.topic.name}
                  </a>
                </div>
              ))}
            </div>
          </div>
        ) : ''}
      </div>
    </Card>
  )
}

function getNode(name, data) {
  const edges = data.github.search.edges
  const edge = edges.find(edge => {
    return edge.node.nameWithOwner === name
  })
  return edge ? edge.node : undefined
}

export default GitHub
