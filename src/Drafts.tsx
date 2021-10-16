import React from "react";
import { PostsList } from "./PostsList";
import { useDrafts } from "./useDrafts";

export const Drafts = () => {
    const drafts = useDrafts();

    return (
        <div id="drafts-container">
            <h3>Drafts</h3>
            <PostsList posts={drafts} />
        </div>
    )
};
