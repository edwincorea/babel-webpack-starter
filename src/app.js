import { person, sayHello } from "./lib";

console.log(person.name);

console.log(sayHello("Brad"));

const getPosts = async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");

    const data = await response.json();

    return data;
};

getPosts().then(posts => console.log(posts));