import React from 'react'

export default function ArticlesToggle({ username }) {
  return (
    <div className="articles-toggle">
      <ul className="nav nav-pills outline-active">
        <li className="nav-item">
          <a className="nav-link active" href={`/#/@${username}/my`}>
            My Articles
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href={`/#/@${username}/favorites`}>
            Favorited Articles
          </a>
        </li>
      </ul>
    </div>
  )
}
