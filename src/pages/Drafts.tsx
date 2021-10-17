import React from "react";
import { PostsList } from "../components/PostsList";
import { useDrafts } from "../hooks/useDrafts";

export const Drafts = () => {
    const drafts = useDrafts();

    return (
        <div id="drafts-container">
            <h3>Drafts</h3>
            <PostsList posts={drafts} />
        </div>
    );
};
