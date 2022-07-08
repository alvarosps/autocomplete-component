1. What is the difference between Component and PureComponent? give an
example where it might break my app.

- PureComponent is static, doesn't have lifecycle method shouldComponentUpdate(), while Component will re-render itself if any update happens on the props/state. PureComponent is more optimized.
- It'll break the app if you use PureComponent when State/Props are not an immutable object.

2. Context + ShouldComponentUpdate might be dangerous. Can think of why is
that?

- When updating a component, if shouldComponentUpdate returns false, it'll cause any context update to not be propagated.

3. Describe 3 ways to pass information from a component to its PARENT.

-  Create a function on the parent component that updates the data, pass this function to child as props.

- Context API
- Redux state

4. Give 2 ways to prevent components from re-rendering.

- When using class component, use the shouldComponentUpdate method
- In functional components, React.memo() can be used 

5. What is a fragment and why do we need it? Give an example where it might
break my app.

- Fragments are to wrap mupltiple elements without having extra HTML nodes.
- It can break style if you use as a container component.

6. Give 3 examples of the HOC pattern.

- Redux connect method to map state/dispatch to props
- Create a HOC component
`const HOC = (HocComponent) => {`
`   return (`
`       <div>`
`           <HocComponent />`
`       </div>`
`   );`
`}`


Have other component, like `App`, use it:
`App = HOC(App)`
- .

7. what's the difference in handling exceptions in promises, callbacks and
async...await.

- When using promises or callback, you have the catch() method to handle exceptions.
- When using async/await, you have to wrap the entire related code in a try/catch block.

8. How many arguments does setState take and why is it async.

- setState takes 2 arguments `setState(stateChange[, callback])`
You can use it passing 1 object only (with the updates), and pass a callback function as well.
- it is async because the update might be too expensive and create unresponsiveness in the browser.

9. List the steps needed to migrate a Class to Function Component.

- Change `class App extends Component` to `const App = () => {`
- Remove `render()` method and use `return` to return the element
- export the App component you created (in the end)
- If there isn't state, ends here.
- Add hooks (if there is state), can use useState for each variable in previous state, and update it in useEffect controlling when to update to do the state updates.
- If it was PureComponent, use React memo.

10. List a few ways styles can be used with components.

- Import css/scss files
- Styled components
- inline styles
- create style object and use it inline

11. How to render an HTML string coming from the server.

- Can use the attr dangerouslySetInnerHTML in the element and insert it with React, or Can create a HTML element, and add the HTML string in the element innerHTML attribute.