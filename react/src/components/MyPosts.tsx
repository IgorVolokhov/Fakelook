import React from 'react'
import { getAllUserFriendsPosts } from '../services/posts/posts.axios';

const MyPosts = (id: any) => {
    const posts = getAllUserFriendsPosts(id)
    
    return (
        <div>
            
        </div>
    )
}

export default MyPosts
