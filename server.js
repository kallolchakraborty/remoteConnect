/** importing packages */
/** express: for exposing it as an API */
const express = require("express");
/** axios: for REST service */
const axios = require("axios");
/** sap-cf-axios: to make calls via the destinations */
const sapcfaxios = require("sap-cf-axios").default;

/** runs at the backend */
const app = express();
/** setting the PORT & if not available will be set to 4000 */
const PORT = process.env.PORT || 4000;

/** function definitions
 * req: request
 * res: response
 */
const getOrder = async (req, res) => {
  const axios = sapcfaxios("DST030");
  console.log("entering the GET req of MaintenanceOrder:--------->");

  /** the destination is having basic authentication */
  const response = await axios({
    method: "GET",
    url: "/API_MAINTENANCEORDER/MaintenanceOrder",
    params: {
      $format: "json",
    },
    headers: {
      accept: "application/json",
    },
  });
  console.log("sending the req of MaintenanceOrder:--------->");
  res.send(response.data.d.results);
};

const getHomePage = async (req, res) => {
  res.send("homepage of remoteConnectjs.");
};

/** using expand to access the operations */
const getOperations = async (req, res) => {
  const axios = sapcfaxios("DST030");
  console.log("entering the GET req of MaintenanceOrder:--------->");

  /** the destination is having basic authentication */
  const response = await axios({
    method: "GET",
    url: "/API_MAINTENANCEORDER/MaintenanceOrder?$expand=to_MaintenanceOrderOperation",
    params: {
      $format: "json",
    },
    headers: {
      accept: "application/json",
    },
  });
  console.log("sending the req of MaintenanceOrder:--------->");
  res.send(response.data.d.results);
};

/** endpoints */
app.get("/orders", getOrder);
app.get("/operations", getOperations);
app.get("/", getHomePage);

/** for displaying the PORT */
app.listen(PORT),
  () => {
    console.log(`Listnening to the PORT: ${PORT}`);
  };
