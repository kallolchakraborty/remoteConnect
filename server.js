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
const getOrderFromDest = async (req, res) => {
  console.log("entering the GET req of Destination:--------->");

  /** the destination is having OAuth2ClientCredentials authentication */
  const axios = sapcfaxios("MaintenanceOrderCPI");
  var authorization = req.headers.authorization;

  /** POST method */
  const response = await axios({
    method: "POST",
    url: "/http/STO/MaintenanceOrderInput",
    params: {
      "$format": "json"
    },
    headers: {
      "content-type": "application/json",
      authorization
    },
    /** payload */
    data: {
      "MaintenancePlanningPlant": "1710",
      "MaintenanceOrderType": "ZSTO",
      "MainWorkCenter": "RES-0200",
    }
  });

  /** return */
  res.send(response.data.d.results);
};


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
app.get("/getOrderFromDest", getOrderFromDest);
app.get("/orders", getOrder);
app.get("/operations", getOperations);
app.get("/", getHomePage);

/** for displaying the PORT */
app.listen(PORT),
  () => {
    console.log(`Listnening to the PORT: ${PORT}`);
  };
