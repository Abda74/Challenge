import React, { useState } from "react";
import BlogHeader from "./BlogHeader.jsx";
import Articles from "./Articles.jsx";
import SearchByTopic from "./SearchByTopic.jsx";

const Main = () => {
    const [selectedTopic, setSelectedTopic] = useState(null);

    console.log("Selected Topic in Main:", selectedTopic); // Debugging

    return (
        <main className="container m-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 h-screen">
            <section className="order-2 sm:order-1 col-span-1 sm:col-span-2 lg:col-span-2 p-6 border-2">
                <BlogHeader />
                <Articles selectedTopic={selectedTopic} />
            </section>
            <section className="order-1 sm:order-2 col-span-1 border-2 p-6">
                <SearchByTopic onSelectTopic={setSelectedTopic} />
            </section>
        </main>
    );
};

export default Main;