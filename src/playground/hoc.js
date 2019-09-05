//Higher Order Component (HOC) - a component (hoc) that renders another component -uses:
//Reuse code
//Render Hijacking
//Prop manipulation
//Abstract state

import React from 'react';
import ReactDOM from 'react-dom';

const Info = props => (
  <div>
    <h1>Info</h1>
    <p>The info is: {props.info}</p>
  </div>
);

const withAdminWarning = WrappedComponent => {
  //this is the HOC
  return props => (
    <div>
      {props.isAdmin && <h3>This private info! Please do not share!</h3>}

      <WrappedComponent {...props} />
    </div>
  );
};

const requireAuthentication = WrappedComponent => {
  return props => (
    <div>
      {props.isAuthenticated ? (
        <WrappedComponent {...props} />
      ) : (
        <p>Please log in to see info</p>
      )}
    </div>
  );
};

const AdminInfo = withAdminWarning(Info);
const Authinfo = requireAuthentication(Info);

ReactDOM.render(
  <Authinfo isAuthenticated={true} info='This are the details !!' />,
  document.getElementById('app')
);

// ReactDOM.render(
//   <AdminInfo isAdmin={false} info='This are the details !!' />,
//   document.getElementById('app')
// );

// ReactDOM.render(
//   <Info info='This are the detail!' />,
//   document.getElementById('app')
// );
