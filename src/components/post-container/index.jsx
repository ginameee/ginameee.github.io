import React from 'react'

export const PostContainer = ({ html }) => (
  <div class="post-container" dangerouslySetInnerHTML={{ __html: html }} />
)
