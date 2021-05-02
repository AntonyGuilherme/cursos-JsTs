module.exports = {
  preset: 'ts-jest',
  globals : {
    address : 'http://localhost:3001',
    auth : 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbkBlbWFpbC5jb20iLCJpc3MiOiJtZWF0LWFwaSIsImlhdCI6MTYxOTk3NTE5OX0.Uv8FwC0VOrNu3OcvppKFfbCxI3DwVzqoO_tSGmrLdgQ',
    authNoPermissions : 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pblBlcm1pc3Npb25AZW1haWwuY29tIiwiaXNzIjoibWVhdC1hcGkiLCJpYXQiOjE2MTk5NzY2ODl9.xcfZOW2XXJpmCT4CZ-6qZm-PWcCmu90Up-njhfTZxNU'
  },
  verbose: true,
  testEnvironment: 'node',
};