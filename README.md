## Application

This is sample application to access S4H OP destination.

### Commands

1. `cf push remoteConnectjs --random-route` to push the node js application.
2. `cf logs remoteConnectjs --recent` to check the logs of the application.

### Pre-requisites

1. The cloud connector should be configured for the S4H OP.
2. Replace the start section of the scripts of package.json to `start": "node server`. As the server.js needs to be run.
3. npm packages: `express`, `axios`, `sap-cf-axios`.
4. Create a `destionation service` & bind it to the application. To access the destination
5. Create a `connectivity service` & bind it to the application.
6. Restart the application.
7. Min Req: Instance Memory: 64MB & Instance Disk: 256MB

