import React from 'react';
import ArticleForm from "../components/articles/ArticleForm.jsx";
import {MantineProvider} from "@mantine/core";

const Articles = () => {
    return (
        <div>
            <MantineProvider>
                <ArticleForm />
            </MantineProvider>

        </div>
    );
};

export default Articles;