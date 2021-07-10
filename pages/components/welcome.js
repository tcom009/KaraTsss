function Welcome({ username }) {
  return (
    <div className="container">
      <div className="columns">
        <div className="column is-one-third"></div>
        <div className="column  box is-one-third">
          <h1>Bienvenido {username}</h1>
        </div>
        <div className="column is-one-third"></div>
      </div>
    </div>
  );
}
export default Welcome;
